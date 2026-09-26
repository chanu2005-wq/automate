import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FilterSidebar from "../components/vehicles/FilterSidebar";
import FilterDrawer from "../components/vehicles/FilterDrawer";
import VehicleCard from "../components/vehicles/VehicleCard";
import VehicleCardSkeleton from "../components/vehicles/VehicleCardSkeleton";
import AnimatedPage from "../components/common/AnimatedPage";

const Vehicles = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    transmissionAutomatic: false,
    transmissionManual: false,
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const { getVehicles } = await import("../api/vehicleApi");

        const query = {};

        // Category
        if (filters.category) {
          query.category = filters.category;
        }

        // Minimum price
        if (filters.minPrice !== "") {
          const priceMin = Number(filters.minPrice);

          if (!Number.isNaN(priceMin)) {
            query.priceMin = priceMin;
          }
        }

        // Maximum price
        if (filters.maxPrice !== "") {
          const priceMax = Number(filters.maxPrice);

          if (!Number.isNaN(priceMax)) {
            query.priceMax = priceMax;
          }
        }

        // Transmission
        if (filters.transmissionAutomatic) {
          query.transmission = "automatic";
        } else if (filters.transmissionManual) {
          query.transmission = "manual";
        }

        console.log("Vehicle API query:", query);

        const response = await getVehicles(query);

        console.log("Vehicle API response:", response);

        /*
         * Handle different possible API response formats.
         */
        let vehicleData = [];

        if (Array.isArray(response)) {
          vehicleData = response;
        } else if (Array.isArray(response?.data)) {
          vehicleData = response.data;
        } else if (Array.isArray(response?.vehicles)) {
          vehicleData = response.vehicles;
        } else if (Array.isArray(response?.data?.vehicles)) {
          vehicleData = response.data.vehicles;
        }

        console.log("Vehicles extracted:", vehicleData);

        setVehicles(vehicleData);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);

        setVehicles([]);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load vehicles",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    console.log("New filters:", newFilters);
    setFilters(newFilters);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  return (
    <div className="vehicles-page flex min-h-[calc(100vh-64px)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <FilterSidebar filters={filters} onApply={handleFilterChange} />
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onApply={handleFilterChange}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Available Vehicles
            </h1>

            {!loading && !error && (
              <p className="text-sm text-gray-500 mt-1">
                {vehicles.length} vehicle
                {vehicles.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="md:hidden px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Filters
          </button>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Unable to load vehicles</p>

            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <VehicleCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Vehicles */}
        {!loading && !error && vehicles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle._id || vehicle.id || index}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && vehicles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🚗</div>

            <h2 className="text-xl font-semibold text-gray-800">
              No vehicles found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your filters to find available vehicles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
