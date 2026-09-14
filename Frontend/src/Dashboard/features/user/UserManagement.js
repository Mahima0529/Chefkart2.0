import React, { useState, useEffect } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import api from '../../../config/api';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/auth/users');
      const data = res.data;
      setUsers(Array.isArray(data) ? data : data.data || data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      showNotification(err.response?.data?.message || 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
  };

  const handleRoleToggle = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change ${user.name}'s role to "${newRole}"?`)) return;

    try {
      await api.put(`/auth/users/${user._id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
      );
      showNotification(`Updated role for ${user.name} to ${newRole}`);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update role', 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)) return;

    try {
      await api.delete(`/auth/users/${user._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      showNotification(`User ${user.name} deleted successfully`);
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/auth/register', formData);
      showNotification('User created successfully!');
      setShowModal(false);
      setFormData({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to create user', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || (u.role || 'user') === roleFilter;
    const matchesSearch =
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalStandard = users.length - totalAdmins;

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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-300 p-4">
          <div className="stat-title text-sm">Total Accounts</div>
          <div className="stat-value text-primary text-2xl">{users.length}</div>
          <div className="stat-desc">Registered users & staff</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-300 p-4">
          <div className="stat-title text-sm">Administrators</div>
          <div className="stat-value text-secondary text-2xl">{totalAdmins}</div>
          <div className="stat-desc">Full dashboard access</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-300 p-4">
          <div className="stat-title text-sm">Standard Users</div>
          <div className="stat-value text-accent text-2xl">{totalStandard}</div>
          <div className="stat-desc">Customer accounts</div>
        </div>
      </div>

      <TitleCard
        title="User & Role Management"
        topMargin="mt-2"
        TopSideButtons={
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-sm normal-case flex items-center gap-1"
          >
            <UserPlusIcon className="w-4 h-4" /> Add User
          </button>
        }
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full sm:w-72"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="user">Users Only</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-2 text-gray-500">Loading users from Chefkart database...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-lg border border-dashed border-gray-300">
            <p className="text-lg font-medium text-gray-600">No users found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, idx) => (
                  <tr key={u._id || idx}>
                    <td>{idx + 1}</td>
                    <td className="font-semibold">{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge badge-sm font-semibold ${
                          u.role === 'admin'
                            ? 'badge-secondary text-white'
                            : 'badge-ghost'
                        }`}
                      >
                        {u.role === 'admin' ? 'Admin 👑' : 'User'}
                      </span>
                    </td>
                    <td className="text-xs text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleRoleToggle(u)}
                          title={`Toggle role to ${u.role === 'admin' ? 'user' : 'admin'}`}
                          className="btn btn-ghost btn-xs text-primary"
                        >
                          <ShieldCheckIcon className="w-4 h-4 mr-1 inline" />
                          {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          title="Delete User"
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

      {/* Add User Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4 text-primary">Register New User</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Password *</span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Account Role</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="user">User (Customer)</option>
                  <option value="admin">Admin (Dashboard Access)</option>
                </select>
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
                  Register User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
