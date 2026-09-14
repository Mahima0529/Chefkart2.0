import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../../config/api';
import { Link } from 'react-router-dom';
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon';

const DashboardCard = ({ title, value, subtitle, icon, color }) => (
  <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-5 flex items-center justify-between transition hover:shadow-md">
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-base-content">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    bookedCount: 0,
    totalChefs: 0,
    verifiedChefs: 0,
    totalUsers: 0,
    totalServices: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    setLoading(true);
    try {
      const [bookingRes, chefRes, userRes, serviceRes] = await Promise.allSettled([
        api.get('/booking/getAll'),
        api.get('/chef/get'),
        api.get('/auth/users'),
        api.get('/service/get'),
      ]);

      let bData = [];
      if (bookingRes.status === 'fulfilled') {
        const raw = bookingRes.value.data;
        bData = Array.isArray(raw) ? raw : raw?.data || raw?.bookings || [];
      }

      let cData = [];
      if (chefRes.status === 'fulfilled') {
        const raw = chefRes.value.data;
        cData = Array.isArray(raw) ? raw : raw?.data || raw?.chefs || [];
      }

      let uData = [];
      if (userRes.status === 'fulfilled') {
        const raw = userRes.value.data;
        uData = Array.isArray(raw) ? raw : raw?.data || raw?.users || [];
      }

      let sData = [];
      if (serviceRes.status === 'fulfilled') {
        const raw = serviceRes.value.data;
        sData = Array.isArray(raw) ? raw : raw?.data || raw?.services || [];
      }

      const bookedCount = bData.filter((b) => b.status === 'booked').length;
      const verifiedChefs = cData.filter((c) => c.verified).length;

      setStats({
        totalBookings: bData.length,
        bookedCount,
        totalChefs: cData.length,
        verifiedChefs,
        totalUsers: uData.length,
        totalServices: sData.length,
      });

      // Get latest 5 bookings sorted by createdAt descending
      const sortedBookings = [...bData].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setRecentBookings(sortedBookings.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Bookings', count: stats.totalBookings },
    { name: 'Active Chefs', count: stats.totalChefs },
    { name: 'Users', count: stats.totalUsers },
    { name: 'Services', count: stats.totalServices },
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Chefkart Admin Console</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of bookings, chefs, customers, and operations</p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/booking" className="btn btn-primary btn-sm normal-case">
            Manage Bookings
          </Link>
          <Link to="/dashboard/Chef" className="btn btn-outline btn-sm normal-case">
            Chef Directory
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Bookings"
          value={loading ? '...' : stats.totalBookings}
          subtitle={`${stats.bookedCount} active appointments`}
          icon={<CalendarDaysIcon className="w-6 h-6 text-primary" />}
          color="bg-primary/10"
        />
        <DashboardCard
          title="Chefs Onboarded"
          value={loading ? '...' : stats.totalChefs}
          subtitle={`${stats.verifiedChefs} verified culinary pros`}
          icon={<UserGroupIcon className="w-6 h-6 text-success" />}
          color="bg-success/10"
        />
        <DashboardCard
          title="Registered Users"
          value={loading ? '...' : stats.totalUsers}
          subtitle="Customers & administrators"
          icon={<UsersIcon className="w-6 h-6 text-info" />}
          color="bg-info/10"
        />
        <DashboardCard
          title="Chefkart Services"
          value={loading ? '...' : stats.totalServices}
          subtitle="Party cook, daily cook & more"
          icon={<SparklesIcon className="w-6 h-6 text-warning" />}
          color="bg-warning/10"
        />
      </div>

      {/* Main Content Grid: Chart & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Activity Distribution Chart */}
        <div className="lg:col-span-2 bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
          <h3 className="text-lg font-bold text-base-content mb-1">Platform Activity Metrics</h3>
          <p className="text-xs text-gray-400 mb-4">Distribution of key records across the database</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-base-content mb-1">Quick Actions</h3>
            <p className="text-xs text-gray-400 mb-4">Direct shortcuts to critical workflows</p>
            <div className="space-y-3">
              <Link
                to="/dashboard/booking"
                className="flex items-center justify-between p-3 rounded-lg border border-base-200 hover:bg-base-200/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-md bg-orange-100 text-orange-600">📅</span>
                  <span className="text-sm font-semibold">Manage Bookings</span>
                </div>
                <span className="text-xs text-primary font-bold">→</span>
              </Link>
              <Link
                to="/dashboard/Chef"
                className="flex items-center justify-between p-3 rounded-lg border border-base-200 hover:bg-base-200/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-md bg-green-100 text-green-600">👨‍🍳</span>
                  <span className="text-sm font-semibold">Verify & Onboard Chefs</span>
                </div>
                <span className="text-xs text-primary font-bold">→</span>
              </Link>
              <Link
                to="/dashboard/User"
                className="flex items-center justify-between p-3 rounded-lg border border-base-200 hover:bg-base-200/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-md bg-blue-100 text-blue-600">👥</span>
                  <span className="text-sm font-semibold">Manage User Privileges</span>
                </div>
                <span className="text-xs text-primary font-bold">→</span>
              </Link>
              <Link
                to="/dashboard/Blog"
                className="flex items-center justify-between p-3 rounded-lg border border-base-200 hover:bg-base-200/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-md bg-purple-100 text-purple-600">📝</span>
                  <span className="text-sm font-semibold">Publish Blog Articles</span>
                </div>
                <span className="text-xs text-primary font-bold">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-base-200 text-center">
            <span className="text-xs text-gray-400">Chefkart Backend connected @ port 3000</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-base-content">Recent Chef Bookings</h3>
            <p className="text-xs text-gray-400">Latest customer appointments scheduled</p>
          </div>
          <Link to="/dashboard/booking" className="text-xs text-primary font-semibold hover:underline">
            View All ({stats.totalBookings})
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading recent appointments...</div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-400 border border-dashed rounded-lg">
            No bookings recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="bg-base-200">
                  <th>Customer</th>
                  <th>Assigned Chef</th>
                  <th>Booking Date</th>
                  <th>Booking Status</th>
                  <th>Payment</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, idx) => (
                  <tr key={b._id || idx}>
                    <td className="font-semibold">
                      {b.user?.name || (typeof b.user === 'string' ? b.user.substring(0, 8) + '...' : 'Customer')}
                    </td>
                    <td>
                      {b.chef?.name || (typeof b.chef === 'string' ? b.chef.substring(0, 8) + '...' : 'Chef')}
                    </td>
                    <td>
                      {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-semibold ${
                          b.status === 'booked' ? 'badge-success text-white' : 'badge-warning text-gray-900'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div>
                        <span
                          className={`badge badge-sm font-semibold ${
                            b.paymentStatus === 'paid'
                              ? 'badge-success text-white'
                              : 'badge-warning text-gray-800'
                          }`}
                        >
                          {b.paymentStatus === 'paid' ? `Paid (₹${b.amount || 499})` : 'Pending'}
                        </span>
                        {b.paymentId && (
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5 max-w-[110px] truncate" title={b.paymentId}>
                            {b.paymentId}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="text-xs text-gray-500 max-w-xs truncate">{b.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;