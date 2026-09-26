import React, { useState } from 'react';

const VehicleGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || 'https://via.placeholder.com/800x500?text=No+Image');

  return (
    <div className="vehicle-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="main-image" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <img src={mainImage} alt="Vehicle Main" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'cover' }} />
      </div>
      <div className="thumbnail-list" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setMainImage(img)}
            style={{ 
              width: '100px', height: '70px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
              border: mainImage === img ? '2px solid #f59e0b' : '2px solid transparent'
            }}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleGallery;
