import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = () => {
  return (
    <div className="confirmation-page" style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#10b981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 24px auto' }}>
        ✓
      </div>
      
      <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '16px' }}>Booking Confirmed!</h1>
      <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '32px' }}>
        Thank you for choosing AutoMate. Your booking reference is <strong>#AM-8492X</strong>.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/my-bookings" style={{ padding: '12px 24px', backgroundColor: '#1f2937', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          View My Bookings
        </Link>
        <Link to="/vehicles" style={{ padding: '12px 24px', backgroundColor: '#e5e7eb', color: '#374151', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Browse More Vehicles
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
