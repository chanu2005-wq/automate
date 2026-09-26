import React from 'react';

const VehicleSpecs = ({ specs }) => {
  if (!specs) return null;
  
  return (
    <div className="vehicle-specs" style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#1f2937' }}>Specifications</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>Seats:</span>
          <span style={{ fontWeight: '500', color: '#111827' }}>{specs.seats || 'N/A'}</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>Transmission:</span>
          <span style={{ fontWeight: '500', color: '#111827' }}>{specs.transmission || 'N/A'}</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>Fuel Type:</span>
          <span style={{ fontWeight: '500', color: '#111827' }}>{specs.fuelType || 'N/A'}</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>Mileage:</span>
          <span style={{ fontWeight: '500', color: '#111827' }}>{specs.mileage ? `${specs.mileage} mpg` : 'N/A'}</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
          <span style={{ color: '#6b7280' }}>Engine:</span>
          <span style={{ fontWeight: '500', color: '#111827' }}>{specs.engine || 'N/A'}</span>
        </li>
      </ul>
    </div>
  );
};

export default VehicleSpecs;
