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
        const payments = res?.data?.payments || [];
        setData(Array.isArray(payments) ? payments : []);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments Overview</h1>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading payments...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 text-center py-20">
          <div className="text-5xl mb-4">💳</div>
          <h2 className="text-xl font-semibold text-gray-800">No payments found</h2>
          <p className="text-gray-500 mt-2">There are no payments to manage.</p>
        </div>
      ) : (
        <AdminTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default AdminPayments;
