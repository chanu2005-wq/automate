import React from 'react';
import BookingCard from '../components/bookings/BookingCard';

const MyBookings = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../api/bookingApi').then(({ getMyBookings }) => {
      getMyBookings().then(data => {
        setBookings(data.data || data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="my-bookings-page" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '32px' }}>My Bookings</h1>
      
      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{ color: '#6b7280' }}>You have no bookings yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map(booking => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
