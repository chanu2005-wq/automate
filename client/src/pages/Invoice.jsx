import React from 'react';
import { useParams } from 'react-router-dom';

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../api/bookingApi').then(({ getBooking }) => {
      // In a real app we'd get the actual ID from params if routed properly
      getBooking(id).then(res => {
        const data = res.data || res;
        setInvoice({
          id: data._id,
          date: new Date().toLocaleDateString(),
          customerName: data.user?.name || 'Customer',
          vehicleName: `${data.vehicle?.brand} ${data.vehicle?.model}`,
          rentalPeriod: `${new Date(data.pickupDateTime).toLocaleDateString()} - ${new Date(data.returnDateTime).toLocaleDateString()}`,
          days: data.rentalDuration / 24, // Assuming rentalDuration is in hours
          rate: data.vehicle?.pricePerDay || 0,
          subtotal: data.baseAmount,
          tax: data.additionalCharges || 0,
          total: data.totalAmount
        });
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!invoice) return <div style={{ padding: '40px', textAlign: 'center' }}>Invoice not found</div>;

  return (
    <div className="invoice-page" style={{ maxWidth: '800px', margin: '40px auto', padding: '40px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '2px solid #f3f4f6', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#f59e0b', fontSize: '32px' }}>AutoMate</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Premium Vehicle Rentals</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>INVOICE</h2>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>#{invoice.id}</p>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Date: {invoice.date}</p>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#374151', margin: '0 0 8px 0' }}>Bill To:</h3>
        <p style={{ color: '#4b5563', margin: 0 }}>{invoice.customerName}</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>Description</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>Rate</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>Days</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>Rental: {invoice.vehicleName}<br/><span style={{ fontSize: '12px', color: '#9ca3af' }}>{invoice.rentalPeriod}</span></td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>${invoice.rate}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>{invoice.days}</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#4b5563', textAlign: 'right' }}>${invoice.subtotal}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ width: '300px', marginLeft: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#4b5563' }}>
          <span>Subtotal:</span>
          <span>${invoice.subtotal}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#4b5563' }}>
          <span>Tax (10%):</span>
          <span>${invoice.tax}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px solid #e5e7eb', fontWeight: 'bold', fontSize: '20px', color: '#1f2937' }}>
          <span>Total:</span>
          <span>${invoice.total}</span>
        </div>
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        Thank you for your business!
      </div>
    </div>
  );
};

export default Invoice;
