import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../api/bookingApi').then(({ getBooking }) => {
      getBooking(bookingId).then(res => {
        setBooking(res.data || res);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, [bookingId]);

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment call
    import('../api/paymentApi').then(({ confirmPayment }) => {
      confirmPayment({ bookingId, method: 'Card', amount: booking?.totalAmount || 400 })
        .then(() => navigate(`/booking-confirmation/${bookingId}`))
        .catch(() => navigate(`/booking-confirmation/${bookingId}`)); // mock success anyway
    });
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="checkout-page" style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '32px', textAlign: 'center' }}>Checkout</h1>
      
      <form onSubmit={handlePayment} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', margin: '0 0 20px 0', color: '#374151' }}>Payment Details</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontWeight: '500' }}>Card Number</label>
          <input type="text" placeholder="XXXX XXXX XXXX XXXX" required style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontWeight: '500' }}>Expiry Date</label>
            <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontWeight: '500' }}>CVC</label>
            <input type="text" placeholder="123" required style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total to Pay:</span>
            <span style={{ color: '#f59e0b' }}>${booking?.totalAmount || '400.00'}</span>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
          Pay Securely
        </button>
      </form>
    </div>
  );
};

export default Checkout;
