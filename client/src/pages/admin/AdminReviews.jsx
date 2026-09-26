import React from 'react';
import AdminTable from '../../components/admin/AdminTable';

const AdminReviews = () => {
  const columns = [
    { header: 'Customer', accessor: 'customer' },
    { header: 'Vehicle', accessor: 'vehicle' },
    { header: 'Rating', accessor: 'rating' },
    { header: 'Comment', accessor: 'comment' },
  ];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../../api/adminApi').then(({ getAdminReviews }) => {
      getAdminReviews().then(res => {
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Reviews</h1>
      <AdminTable columns={columns} data={data} onDelete={(r) => console.log(r)} />
    </div>
  );
};

export default AdminReviews;
