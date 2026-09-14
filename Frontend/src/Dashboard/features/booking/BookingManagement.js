import React, { useState, useEffect } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import api from '../../../config/api';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    chef: '',
    bookingDate: '',
    status: 'booked',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingRes, chefRes, userRes] = await Promise.allSettled([
        api.get('/booking/getAll'),
        api.get('/chef/get'),
        api.get('/auth/users'),
      ]);

      if (bookingRes.status === 'fulfilled') {
        const raw = bookingRes.value.data;
        setBookings(Array.isArray(raw) ? raw : raw?.data || raw?.bookings || []);
      }
      if (chefRes.status === 'fulfilled') {
        const raw = chefRes.value.data;
        setChefs(Array.isArray(raw) ? raw : raw?.data || raw?.chefs || []);
      }
      if (userRes.status === 'fulfilled') {
        const raw = userRes.value.data;
        setUsers(Array.isArray(raw) ? raw : raw?.users || []);
      }
    } catch (err) {
      console.error('Error fetching booking data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
  };

  const handleStatusToggle = async (booking) => {
    const newStatus = booking.status === 'booked' ? 'non-booked' : 'booked';
    try {
      await api.put(`/booking/updateBooking/${booking._id}`, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === booking._id ? { ...b, status: newStatus } : b))
      );
      showNotification(`Booking status updated to ${newStatus}`);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  const handlePaymentToggle = async (booking) => {
    const newPaymentStatus = booking.paymentStatus === 'paid' ? 'pending' : 'paid';
    try {
      await api.put(`/booking/updateBooking/${booking._id}`, { paymentStatus: newPaymentStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === booking._id ? { ...b, paymentStatus: newPaymentStatus } : b))
      );
      showNotification(`Payment status changed to ${newPaymentStatus}`);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update payment status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await api.delete(`/booking/delete/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      showNotification('Booking deleted successfully');
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete booking', 'error');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user || !formData.chef || !formData.bookingDate) {
      alert('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post('/booking/createBooking', formData);
      showNotification(res.data?.message || 'Booking created successfully!');
      setShowModal(false);
      setFormData({ user: '', chef: '', bookingDate: '', status: 'booked', notes: '' });
      fetchData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to create booking', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBookings = bookings
    .filter((b) => {
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || (b.paymentStatus || 'pending') === paymentFilter;
      const userName = b.user?.name || b.user?.email || (typeof b.user === 'string' ? b.user : '');
      const chefName = b.chef?.name || (typeof b.chef === 'string' ? b.chef : '');
      const notes = b.notes || '';
      const matchesSearch =
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notes.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPayment && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      {feedback.message && (
        <div
          className={`alert mb-4 shadow-lg ${
            feedback.type === 'error' ? 'alert-error text-white' : 'alert-success text-white'
          }`}
        >
          <span>{feedback.message}</span>
        </div>
      )}

      <TitleCard
        title="Chef Bookings Management"
        topMargin="mt-2"
        TopSideButtons={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary btn-sm normal-case flex items-center gap-1"
            >
              <PlusIcon className="w-4 h-4" /> New Booking
            </button>
          </div>
        }
      >
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by customer, chef, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full sm:w-72"
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="all">All Statuses</option>
                <option value="booked">Booked</option>
                <option value="non-booked">Non-Booked</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button
              onClick={fetchData}
              title="Refresh bookings"
              className="btn btn-ghost btn-sm text-gray-500 hover:text-primary"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-2 text-gray-500">Loading bookings from Chefkart database...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-lg border border-dashed border-gray-300">
            <p className="text-lg font-medium text-gray-600">No bookings found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search filters.'
                : 'Click "New Booking" to record your first chef booking.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th>#</th>
                  <th>Customer</th>
                  <th>Assigned Chef</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>Payment</th>
                  <th>Notes</th>
                  <th>Created At</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, idx) => (
                  <tr key={booking._id || idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <div>
                        <p className="font-semibold">
                          {booking.user?.name || (typeof booking.user === 'string' ? booking.user.substring(0, 10) + '...' : 'Customer')}
                        </p>
                        <p className="text-xs text-gray-500">{booking.user?.email || '-'}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={booking.chef?.profilepic || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100"}
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100";
                          }}
                          className="w-8 h-8 rounded-full object-cover border border-orange-100"
                        />
                        <div>
                          <p className="font-medium">
                            {booking.chef?.name || (typeof booking.chef === 'string' ? booking.chef.substring(0, 10) + '...' : 'Chef')}
                          </p>
                          <p className="text-xs text-gray-500">{booking.chef?.city || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString(undefined, {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-semibold ${
                          booking.status === 'booked' ? 'badge-success text-white' : 'badge-warning text-gray-900'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div>
                        <span
                          onClick={() => handlePaymentToggle(booking)}
                          title="Click to toggle Paid / Pending"
                          className={`badge badge-sm font-semibold cursor-pointer hover:opacity-80 transition select-none ${
                            booking.paymentStatus === 'paid'
                              ? 'badge-success text-white'
                              : booking.paymentStatus === 'failed'
                              ? 'badge-error text-white'
                              : 'badge-warning text-gray-800'
                          }`}
                        >
                          {booking.paymentStatus === 'paid'
                            ? `Paid (₹${booking.amount || 499})`
                            : `Pending (₹${booking.amount || 499})`}
                        </span>
                        {booking.paymentId && (
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5 max-w-[110px] truncate" title={booking.paymentId}>
                            {booking.paymentId}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="max-w-xs truncate">{booking.notes || '-'}</td>
                    <td className="text-xs text-gray-500">
                      {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleStatusToggle(booking)}
                          title={`Switch status to ${booking.status === 'booked' ? 'non-booked' : 'booked'}`}
                          className="btn btn-ghost btn-xs text-primary"
                        >
                          {booking.status === 'booked' ? (
                            <span className="flex items-center text-xs text-warning">Toggle Off</span>
                          ) : (
                            <span className="flex items-center text-xs text-success">Toggle On</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          title="Delete Booking"
                          className="btn btn-ghost btn-xs text-error hover:bg-red-50"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>

      {/* Create Booking Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4 text-primary">Create New Booking</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Select Customer *</span>
                </label>
                {users.length > 0 ? (
                  <select
                    className="select select-bordered w-full"
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    required
                  >
                    <option value="">-- Select Customer --</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Customer User ID"
                    className="input input-bordered w-full"
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    required
                  />
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Select Chef *</span>
                </label>
                {chefs.length > 0 ? (
                  <select
                    className="select select-bordered w-full"
                    value={formData.chef}
                    onChange={(e) => setFormData({ ...formData, chef: e.target.value })}
                    required
                  >
                    <option value="">-- Select Chef --</option>
                    {chefs.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} - {c.city || 'Available'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Chef ID"
                    className="input input-bordered w-full"
                    value={formData.chef}
                    onChange={(e) => setFormData({ ...formData, chef: e.target.value })}
                    required
                  />
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Booking Date *</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={formData.bookingDate}
                  onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="booked">booked</option>
                  <option value="non-booked">non-booked</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Notes</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Special dietary requests, party size, dishes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                  disabled={submitting}
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingManagement;
