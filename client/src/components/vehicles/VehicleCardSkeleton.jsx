import React from 'react';

const VehicleCardSkeleton = () => {
  return (
    <div className="vehicle-card-skeleton" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', display: 'flex', flexDirection: 'column', animation: 'pulse 1.5s infinite ease-in-out' }}>
      <div style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0' }}></div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ width: '60%', height: '24px', backgroundColor: '#e0e0e0', marginBottom: '8px', borderRadius: '4px' }}></div>
        <div style={{ width: '80%', height: '16px', backgroundColor: '#e0e0e0', marginBottom: '16px', borderRadius: '4px' }}></div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '30%', height: '24px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
          <div style={{ width: '80px', height: '36px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
