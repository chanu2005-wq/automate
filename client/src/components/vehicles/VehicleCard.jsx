import React from "react";
import { MapPin, Users, Fuel, Gauge, Star, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";

const VehicleCard = ({ vehicle, isAdmin = false, onEdit, onDelete }) => {
  const imageUrl =
    vehicle?.images?.[0] ||
    vehicle?.image ||
    vehicle?.imageUrl ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Vehicle Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={`${vehicle?.brand || "Car"} ${vehicle?.model || ""}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80";
          }}
        />

        {/* Category */}
        {vehicle?.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
              {vehicle.category}
            </span>
          </div>
        )}

        {/* Availability */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              vehicle?.availability
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {vehicle?.availability ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Vehicle Name */}
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {vehicle?.brand || "Unknown Brand"} {vehicle?.model || "Vehicle"}
        </h3>

        {/* Location */}
        {vehicle?.location && (
          <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />

            <span className="truncate">{vehicle.location}</span>
          </div>
        )}

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {/* Seats */}
          <div className="flex flex-col items-center bg-gray-50 rounded-lg py-2">
            <Users className="w-4 h-4 text-gray-500 mb-1" />

            <span className="text-xs text-gray-600">
              {vehicle?.seats || "-"} Seats
            </span>
          </div>

          {/* Fuel */}
          <div className="flex flex-col items-center bg-gray-50 rounded-lg py-2">
            <Fuel className="w-4 h-4 text-gray-500 mb-1" />

            <span className="text-xs text-gray-600 truncate max-w-full px-1">
              {vehicle?.fuelType || "-"}
            </span>
          </div>

          {/* Transmission */}
          <div className="flex flex-col items-center bg-gray-50 rounded-lg py-2">
            <Gauge className="w-4 h-4 text-gray-500 mb-1" />

            <span className="text-xs text-gray-600 truncate max-w-full px-1">
              {vehicle?.transmission || "-"}
            </span>
          </div>
        </div>

        {/* Rating */}
        {!isAdmin && (
          <div className="flex items-center gap-1 mt-4">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />

            <span className="text-sm font-medium text-gray-700">
              {vehicle?.averageRating?.toFixed(1) || "0.0"}
            </span>

            <span className="text-xs text-gray-400">
              ({vehicle?.totalReviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-end justify-between mt-5 pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-amber-600">
              ${vehicle?.pricePerDay || 0}
            </span>

            <span className="text-sm text-gray-400">/day</span>
          </div>
        </div>

        {/* ADMIN ACTIONS */}
        {isAdmin ? (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => onEdit?.(vehicle)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(vehicle)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ) : (
          /* CUSTOMER ACTIONS */
          <div className="flex gap-2 mt-4">
            <Link
              to={`/vehicles/${vehicle?._id}`}
              className="flex-1 text-center px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              Details
            </Link>

            <Link
              to={`/booking/${vehicle?._id}`}
              className="flex-1 text-center px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
