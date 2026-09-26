import React from 'react';
import StatCard from '../../components/admin/StatCard';
import RevenueChart from '../../components/admin/RevenueChart';
import BookingsChart from '../../components/admin/BookingsChart';
import CategoryChart from '../../components/admin/CategoryChart';

const Dashboard = () => {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    import('../../api/adminApi').then(({ getDashboardStats }) => {
      getDashboardStats().then(res => setStats(res.data || res)).catch(console.error);
    });
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon="💰" change="+12%" isPositive={true} />
        <StatCard title="Active Bookings" value={stats.activeRentals} icon="📅" change="+5%" isPositive={true} />
        <StatCard title="Total Customers" value={stats.totalCustomers} icon="👥" change="+18%" isPositive={true} />
        <StatCard title="Available Vehicles" value={stats.availableVehicles} icon="🚗" change="-2%" isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Bookings</h2>
          <BookingsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicles by Category</h2>
          <CategoryChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Bookings</h2>
          <div className="text-sm text-gray-500">Table placeholder for recent bookings...</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
