import React from 'react';
import AdminTable from '../../components/admin/AdminTable';

const AdminCustomers = () => {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Status', accessor: 'status' },
  ];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../../api/adminApi').then(({ getAdminCustomers }) => {
      getAdminCustomers().then(res => {
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Customers</h1>
      <AdminTable columns={columns} data={data} onEdit={(r) => console.log(r)} onDelete={(r) => console.log(r)} />
    </div>
  );
};

export default AdminCustomers;
