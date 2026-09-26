import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import VehicleCard from "../../components/vehicles/VehicleCard";
import { getAdminVehicles } from "../../api/adminApi";

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminVehicles();

        console.log("ADMIN VEHICLE RESPONSE:", response);

        const vehicleData =
          response?.data?.vehicles ||
          response?.data ||
          response?.vehicles ||
          response ||
          [];

        console.log("VEHICLES TO DISPLAY:", vehicleData);

        setVehicles(Array.isArray(vehicleData) ? vehicleData : []);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setError("Failed to load vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleEdit = (vehicle) => {
    console.log("Edit vehicle:", vehicle);
  };

  const handleDelete = (vehicle) => {
    console.log("Delete vehicle:", vehicle);
  };

  const handleAddVehicle = () => {
    console.log("Add vehicle");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>

          <p className="text-gray-500 mt-1">
            {vehicles.length} vehicles available
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddVehicle}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-100 border border-red-200 text-red-700 px-5 py-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 animate-pulse"
            >
              <div className="h-52 bg-gray-200" />

              <div className="p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && vehicles.length === 0 && !error && (
        <div className="bg-white rounded-2xl border border-gray-200 text-center py-20">
          <div className="text-5xl mb-4">🚗</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No vehicles found
          </h2>

          <p className="text-gray-500 mt-2">
            Add a vehicle to display it here.
          </p>
        </div>
      )}

      {/* Vehicle Cards */}
      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle?._id || vehicle?.id || index}
              vehicle={vehicle}
              isAdmin={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;
