import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingSummary from '../components/bookings/BookingSummary';

const Booking = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [dates, setDates] = useState({ pickup: '', dropoff: '' });

  const [vehicle, setVehicle] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [days, setDays] = React.useState(0);

  React.useEffect(() => {
    import('../api/vehicleApi').then(({ getVehicle }) => {
      getVehicle(vehicleId).then(data => {
        setVehicle(data.data || data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, [vehicleId]);

  React.useEffect(() => {
    if (dates.pickup && dates.dropoff) {
      const start = new Date(dates.pickup);
      const end = new Date(dates.dropoff);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays > 0 ? diffDays : 1);
    }
  }, [dates]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!vehicle) return <div style={{ padding: '40px', textAlign: 'center' }}>Vehicle not found</div>;

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!dates.pickup || !dates.dropoff) {
      alert("Please select dates");
      return;
    }
    
    try {
      const { createBooking } = await import('../api/bookingApi');
      const res = await createBooking({
        vehicleId,
        pickupLocation: "Main Office",
        dropOffLocation: "Main Office",
        pickupDateTime: dates.pickup,
        returnDateTime: dates.dropoff
      });
      if (res.success && res.data?.booking?._id) {
         navigate(`/checkout/${res.data.booking._id}`);
      } else {
         alert("Failed to create booking");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  return (
    <div className="booking-page" style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '32px' }}>Book Your Vehicle</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Form */}
        <div style={{ flex: '1 1 500px' }}>
          <form onSubmit={handleContinue} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 24px 0', color: '#374151' }}>Rental Dates</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontWeight: '500' }}>Pick-up Date & Time</label>
              <input type="datetime-local" required style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} onChange={e => setDates({...dates, pickup: e.target.value})} />
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#4b5563', fontWeight: '500' }}>Drop-off Date & Time</label>
              <input type="datetime-local" required style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px' }} onChange={e => setDates({...dates, dropoff: e.target.value})} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#1f2937', color: 'white', border: 'none', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              Continue to Checkout
            </button>
          </form>
        </div>
        
        {/* Summary */}
        <div style={{ flex: '1 1 300px' }}>
          <BookingSummary 
            vehicle={vehicle} 
            dates={{ pickup: dates.pickup || 'Select date', dropoff: dates.dropoff || 'Select date' }}
            pricing={{ 
              pricePerDay: vehicle.pricePerDay, 
              days: days, 
              subtotal: vehicle.pricePerDay * days, 
              taxes: vehicle.pricePerDay * days * 0.1, 
              total: vehicle.pricePerDay * days * 1.1 
            }} 
          />
        </div>

      </div>
    </div>
  );
};

export default Booking;
