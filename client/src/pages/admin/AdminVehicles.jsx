import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import VehicleCard from "../../components/vehicles/VehicleCard";
import {
  getAdminVehicles,
  createAdminVehicle,
  updateAdminVehicle,
  deleteAdminVehicle,
  toggleVehicleAvailability,
} from "../../api/adminApi";
import toast from "react-hot-toast";

const CATEGORIES = ["Car", "SUV", "Van", "Luxury", "Bike"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const TRANSMISSIONS = ["Manual", "Automatic"];

const initialForm = {
  brand: "",
  model: "",
  category: "",
  registrationNumber: "",
  fuelType: "",
  transmission: "",
  seats: "",
  pricePerDay: "",
  location: "",
  availability: true,
  description: "",
  features: "",
  images: [],
};

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [previewImages, setPreviewImages] = useState([]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAdminVehicles();
      const vehicleData =
        response?.data?.vehicles ||
        response?.data ||
        response?.vehicles ||
        response ||
        [];
        setVehicles(Array.isArray(vehicleData) ? vehicleData : []);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
      setError("Failed to load vehicles.");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = () => {
    setForm(initialForm);
    setPreviewImages([]);
    setOpenAdd(true);
  };

  const handleEdit = (vehicle) => {
    setForm({
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      category: vehicle.category || "",
      registrationNumber: vehicle.registrationNumber || "",
      fuelType: vehicle.fuelType || "",
      transmission: vehicle.transmission || "",
      seats: vehicle.seats || "",
      pricePerDay: vehicle.pricePerDay || "",
      location: vehicle.location || "",
      availability: vehicle.availability !== undefined ? vehicle.availability : true,
      description: vehicle.description || "",
      features: Array.isArray(vehicle.features) ? vehicle.features.join(", ") : "",
      images: Array.isArray(vehicle.images) ? vehicle.images : [],
    });
    setPreviewImages(Array.isArray(vehicle.images) ? vehicle.images : []);
    setEditId(vehicle._id);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    setDeletingId(id);
    try {
      await deleteAdminVehicle(id);
      toast.success("Vehicle deleted");
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete vehicle");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleAvailability = async (id, current) => {
    try {
      await toggleVehicleAvailability(id);
      toast.success(`Vehicle marked as ${!current ? "available" : "unavailable"}`);
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to toggle availability");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removePreview = (idx) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== idx));
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("category", form.category);
      formData.append("registrationNumber", form.registrationNumber);
      formData.append("fuelType", form.fuelType);
      formData.append("transmission", form.transmission);
      formData.append("seats", form.seats);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("location", form.location);
      formData.append("availability", String(form.availability));
      formData.append("description", form.description);
      formData.append("features", form.features);
      (form.images || []).forEach((img) => {
        if (img instanceof File) formData.append("images", img);
      });

      const res = await createAdminVehicle(formData);
      toast.success("Vehicle created successfully");
      setOpenAdd(false);
      setForm(initialForm);
      setPreviewImages([]);
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create vehicle");
    } finally {
      setSaving(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("category", form.category);
      formData.append("registrationNumber", form.registrationNumber);
      formData.append("fuelType", form.fuelType);
      formData.append("transmission", form.transmission);
      formData.append("seats", form.seats);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("location", form.location);
      formData.append("availability", String(form.availability));
      formData.append("description", form.description);
      formData.append("features", form.features);
      (form.images || []).forEach((img) => {
        if (img instanceof File) formData.append("images", img);
      });

      await updateAdminVehicle(editId, formData);
      toast.success("Vehicle updated successfully");
      setOpenEdit(false);
      setForm(initialForm);
      setPreviewImages([]);
      setEditId(null);
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update vehicle");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>
          <p className="text-gray-500 mt-1">
            {vehicles.length} vehicles in fleet
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddVehicle}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:pointer-events-none"
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
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
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
          <h2 className="text-xl font-semibold text-gray-800">No vehicles found</h2>
          <p className="text-gray-500 mt-2">Add a vehicle to display it here.</p>
        </div>
      )}

      {/* Vehicle Cards */}
      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <div key={vehicle?._id || vehicle?.id || index} className="relative">
              <VehicleCard
                vehicle={vehicle}
                isAdmin={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <button
                type="button"
                onClick={() => handleToggleAvailability(vehicle._id, vehicle.availability)}
                className={`absolute top-3 left-3 p-1.5 rounded-full ${
                  vehicle.availability ? "bg-green-500" : "bg-amber-500"
                } text-white shadow-md`}
                title={vehicle.availability ? "Mark Unavailable" : "Mark Available"}
              >
                {vehicle.availability ? "⏸" : "▶"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(vehicle._id)}
                disabled={deletingId === vehicle._id}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ==================== ADD VEHICLE MODAL ==================== */}
      {openAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpenAdd(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto relative z-10">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add New Vehicle</h2>
              <button onClick={() => setOpenAdd(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand</label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Model</label>
                  <input
                    name="model"
                    value={form.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price Per Day ($)</label>
                  <input
                    name="pricePerDay"
                    type="number"
                    value={form.pricePerDay}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Registration Number</label>
                  <input
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select fuel type</option>
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Transmission</label>
                  <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select transmission</option>
                    {TRANSMISSIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Seats</label>
                  <input
                    name="seats"
                    type="number"
                    value={form.seats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      name="availability"
                      type="checkbox"
                      checked={form.availability}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    Available
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Features (comma separated)</label>
                <input
                  name="features"
                  value={form.features}
                  onChange={handleInputChange}
                  placeholder="e.g. GPS, Bluetooth, Sunroof"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Vehicle Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                {previewImages.length > 0 && (
                  <div className="flex gap-2 flex-wrap" style={{ flexWrap: "wrap" }}>
                    {previewImages.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); removePreview(idx); }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenAdd(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-60 transition-colors font-semibold"
                >
                  {saving ? "Creating..." : "Create Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT VEHICLE MODAL ==================== */}
      {openEdit && editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpenEdit(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto relative z-10">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Edit Vehicle</h2>
              <button onClick={() => setOpenEdit(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand</label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Model</label>
                  <input
                    name="model"
                    value={form.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price Per Day ($)</label>
                  <input
                    name="pricePerDay"
                    type="number"
                    value={form.pricePerDay}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Registration Number</label>
                  <input
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select fuel type</option>
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Transmission</label>
                  <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select transmission</option>
                    {TRANSMISSIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Seats</label>
                  <input
                    name="seats"
                    type="number"
                    value={form.seats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      name="availability"
                      type="checkbox"
                      checked={form.availability}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    Available
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Features (comma separated)</label>
                <input
                  name="features"
                  value={form.features}
                  onChange={handleInputChange}
                  placeholder="e.g. GPS, Bluetooth, Sunroof"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Additional Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                {previewImages.length > 0 && (
                  <div className="flex gap-2 flex-wrap" style={{ flexWrap: "wrap" }}>
                    {previewImages.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); removePreview(idx); }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-60 transition-colors font-semibold"
                >
                  {saving ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;
