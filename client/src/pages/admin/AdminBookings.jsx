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
        setData(res.data || res);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h1>
      <AdminTable columns={columns} data={data} onEdit={(r) => console.log(r)} onDelete={(r) => console.log(r)} />
    </div>
  );
};

export default AdminBookings;
