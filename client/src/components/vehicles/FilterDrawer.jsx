import React from 'react';
import FilterSidebar from './FilterSidebar';

const FilterDrawer = ({ isOpen, onClose, filters, onFilterChange }) => {
  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={onClose}></div>
      )}
      <div className="filter-drawer" style={{ 
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '300px', backgroundColor: 'white', zIndex: 50, 
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease-in-out',
        boxShadow: isOpen ? '2px 0 8px rgba(0,0,0,0.1)' : 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Filters</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}>&times;</button>
        </div>
        <div style={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}>
          <FilterSidebar filters={filters} onFilterChange={onFilterChange} />
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
