import React from 'react';
import AdminTable from '../../components/admin/AdminTable';

const AdminPayments = () => {
  const columns = [
    { header: 'Transaction ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status' },
  ];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../../api/adminApi').then(({ getAdminPayments }) => {
      getAdminPayments().then(res => {
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments Overview</h1>
      <AdminTable columns={columns} data={data} />
    </div>
  );
};

export default AdminPayments;
