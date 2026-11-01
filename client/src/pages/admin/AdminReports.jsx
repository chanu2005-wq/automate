import React, { useEffect, useState } from 'react';
import {
  getRevenueReport,
  getVehicleReport,
  getBookingReport,
  getCustomerReport,
} from '../../api/adminApi';

const AdminReports = () => {
  const [revenue, setRevenue] = useState(null);
  const [vehicleReport, setVehicleReport] = useState(null);
  const [bookingReport, setBookingReport] = useState(null);
  const [customerReport, setCustomerReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [rev, veh, book, cust] = await Promise.all([
          getRevenueReport(),
          getVehicleReport(),
          getBookingReport(),
          getCustomerReport(),
        ]);
        setRevenue(rev?.data?.revenue || rev?.revenue || null);
        setVehicleReport(veh?.data?.vehicle || veh?.vehicle || null);
        setBookingReport(book?.data?.booking || book?.booking || null);
        setCustomerReport(cust?.data?.customer || cust?.customer || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>
      {error && (
        <div className="mb-6 rounded-lg bg-red-100 border border-red-200 text-red-700 px-5 py-4">
          {error}
        </div>
      )}
      <div className="grid gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Report</h3>
          {revenue ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Revenue:</span>
                <span className="font-semibold">${
                  Array.isArray(revenue.monthly)
                    ? revenue.monthly.length
                    : 0
                } months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Revenue:</span>
                <span className="font-semibold text-amber-600">
                  ${revenue.totalRevenue || 0}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No revenue data available.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Report</h3>
          {vehicleReport ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Available:</span>
                <span className="font-semibold">{vehicleReport.availabilityStats?.available || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Unavailable:</span>
                <span className="font-semibold">{vehicleReport.availabilityStats?.unavailable || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Categories:</span>
                <span className="font-semibold">{Array.isArray(vehicleReport.categoryDist) ? vehicleReport.categoryDist.length : 0}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No vehicle data available.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Report</h3>
          {bookingReport ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Status Distribution:</span>
                <span className="font-semibold">
                  {Array.isArray(bookingReport.statusDist) ? bookingReport.statusDist.length : 0} statuses
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Trend:</span>
                <span className="font-semibold">{Array.isArray(bookingReport.monthly) ? bookingReport.monthly.length : 0} months</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No booking data available.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Report</h3>
          {customerReport ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Customers:</span>
                <span className="font-semibold">{customerReport.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blocked:</span>
                <span className="font-semibold">{customerReport.blocked || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active:</span>
                <span className="font-semibold">{customerReport.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">New (30 days):</span>
                <span className="font-semibold">{customerReport.newCustomers || 0}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No customer data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
