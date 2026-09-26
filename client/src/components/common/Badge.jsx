const statusConfig = {
  Pending: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-green-100 text-green-800',
  Active: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-gray-100 text-gray-700',
  Cancelled: 'bg-red-100 text-red-700',
  Rejected: 'bg-red-100 text-red-700',
  Paid: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-amber-100 text-amber-800',
  Available: 'bg-emerald-100 text-emerald-800',
  Unavailable: 'bg-red-100 text-red-700',
};

const Badge = ({ status, className = '' }) => (
  <span className={`badge ${statusConfig[status] || 'bg-gray-100 text-gray-700'} ${className}`}>
    {status}
  </span>
);

export default Badge;
