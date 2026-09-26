import React from 'react';

const FilterSidebar = ({ onApply, isOpen, onClose }) => {
  // filter state
  const [category, setCategory] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [transmissionAutomatic, setTransmissionAutomatic] = React.useState(false);
  const [transmissionManual, setTransmissionManual] = React.useState(false);

  const filterValues = {
    category,
    minPrice,
    maxPrice,
    transmissionAutomatic,
    transmissionManual,
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleAutoChange = (e) => setTransmissionAutomatic(e.target.checked);
  const handleManualChange = (e) => setTransmissionManual(e.target.checked);

  return (
    <div className="filter-sidebar" style={{ width: '250px', padding: '20px', backgroundColor: '#f9fafb', borderRight: '1px solid #e5e7eb', height: '100%' }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Filters</h3>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#4b5563' }}>Category</h4>
        <select value={category} onChange={handleCategoryChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
          <option value="">All Categories</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
          <option value="sports">Sports</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#4b5563' }}>Price Range (Per Day)</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
            style={{ width: '45%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            style={{ width: '45%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#4b5563' }}>Transmission</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
            <input
              type="checkbox"
              checked={transmissionAutomatic}
              onChange={handleAutoChange}
            />
            Automatic
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
            <input
              type="checkbox"
              checked={transmissionManual}
              onChange={handleManualChange}
            />
            Manual
          </label>
        </div>
      </div>

      <button
        onClick={() => onApply(filterValues)}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Apply Filters
      </button>

      <button
        onClick={() => {
          onClose();
        }}
        style={{
          width: '100%',
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#e5e7eb',
          color: '#111827',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default FilterSidebar;