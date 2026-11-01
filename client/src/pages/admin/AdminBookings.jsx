import React from 'react';
import AdminTable from '../../components/admin/AdminTable';

const AdminBookings = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Vehicle', accessor: 'vehicle' },
    { header: 'Dates', accessor: 'dates' },
    { header: 'Status', accessor: 'status' },
  ];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../../api/adminApi').then(({ getAdminBookings }) => {
      getAdminBookings().then(res => {
        // Backend wraps response as { success, message, data: { bookings: [...] } }
        // getAdminBookings() returns r.data, so res = { success, message, data: { bookings } }
        const bookings = res?.data?.bookings || [];
        setData(Array.isArray(bookings) ? bookings : []);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setData([]);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h1>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-800">No bookings found</h2>
          <p className="text-gray-500 mt-2">There are no bookings to manage.</p>
        </div>
      ) : (
        <AdminTable columns={columns} data={data} onEdit={(r) => console.log(r)} onDelete={(r) => console.log(r)} />
      )}
    </div>
  );
};

export default AdminBookings;
