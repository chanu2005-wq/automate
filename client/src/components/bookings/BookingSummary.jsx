import React from 'react';

const BookingSummary = ({ vehicle, dates, pricing }) => {
  return (
    <div className="booking-summary" style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Booking Summary</h3>
      
      {vehicle && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <img src={vehicle.image || 'https://via.placeholder.com/150'} alt={vehicle.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#374151' }}>{vehicle.brand} {vehicle.model}</h4>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>{vehicle.category}</span>
          </div>
        </div>
      )}

      {dates && (
        <div style={{ marginBottom: '20px', fontSize: '14px', color: '#4b5563' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Pick-up:</span>
            <strong>{dates.pickup}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Drop-off:</span>
            <strong>{dates.dropoff}</strong>
          </div>
        </div>
      )}

      {pricing && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
            <span>${pricing.pricePerDay} x {pricing.days} days</span>
            <span>${pricing.subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
            <span>Taxes & Fees</span>
            <span>${pricing.taxes}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            <span>Total</span>
            <span>${pricing.total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
