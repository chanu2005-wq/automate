import React from 'react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="booking-card" style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', marginBottom: '16px' }}>
      <div style={{ padding: '16px', display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#1f2937' }}>Booking #{booking.id || 'XXXX'}</h3>
          <span style={{ padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', color: 'white', backgroundColor: getStatusColor(booking.status) }}>
            {booking.status || 'Pending'}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', color: '#4b5563', fontSize: '14px', marginTop: '8px' }}>
          <div>
            <strong>Vehicle:</strong> {booking.vehicleName || 'Unknown Vehicle'}
          </div>
          <div>
            <strong>Dates:</strong> {booking.startDate} to {booking.endDate}
          </div>
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6' }}>
          <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Total: ${booking.totalPrice || 0}</span>
          <Link to={`/bookings/${booking.id}`} style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '500' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
