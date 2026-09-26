import React from 'react';
import { useParams, Link } from 'react-router-dom';
import VehicleGallery from '../components/vehicles/VehicleGallery';
import VehicleSpecs from '../components/vehicles/VehicleSpecs';

const VehicleDetail = () => {
  const { id } = useParams();
  
  const [vehicle, setVehicle] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../api/vehicleApi').then(({ getVehicle }) => {
      getVehicle(id).then(data => {
        setVehicle(data.data || data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!vehicle) return <div style={{ padding: '40px', textAlign: 'center' }}>Vehicle not found</div>;

  return (
    <div className="vehicle-detail-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '40px' }}>
        
        {/* Left Column - Images */}
        <div style={{ flex: '1 1 60%' }}>
          <VehicleGallery images={vehicle.images} />
        </div>
        
        {/* Right Column - Info */}
        <div style={{ flex: '1 1 40%' }}>
          <h1 style={{ fontSize: '36px', color: '#1f2937', margin: '0 0 10px 0' }}>{vehicle.brand} {vehicle.model}</h1>
          <p style={{ fontSize: '18px', color: '#6b7280', margin: '0 0 20px 0' }}>{vehicle.category}</p>
          
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '24px' }}>
            ${vehicle.pricePerDay} <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: 'normal' }}>/ day</span>
          </div>

          <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '32px' }}>
            {vehicle.description}
          </p>

          <Link to={`/book/${vehicle._id}`} style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: '#f59e0b', color: 'white', padding: '16px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', marginBottom: '32px' }}>
            Book Now
          </Link>

          <VehicleSpecs specs={vehicle.specs} />
        </div>

      </div>
    </div>
  );
};

export default VehicleDetail;
