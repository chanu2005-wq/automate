import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "../components/vehicles/VehicleCard";
import VehicleCardSkeleton from "../components/vehicles/VehicleCardSkeleton";
import AnimatedPage from "../components/common/AnimatedPage";

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../api/vehicleApi")
      .then(({ getFeaturedVehicles }) => {
        return getFeaturedVehicles();
      })
      .then((data) => {
        const vehicles =
          data?.data?.vehicles || data?.data || data?.vehicles || data || [];

        setFeaturedVehicles(Array.isArray(vehicles) ? vehicles : []);
      })
      .catch((err) => {
        console.error("Failed to load featured vehicles:", err);
        setFeaturedVehicles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AnimatedPage className="home-page">
      {/* Orange Dot Background */}
      <div className="relative min-h-screen bg-[#fff7ed] overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "#fff7ed",
            backgroundImage: `
              radial-gradient(#f97316 10%, transparent 10%),
              radial-gradient(#f97316 10%, transparent 10%)
            `,
            backgroundSize: "100px 100px",
            backgroundPosition: "0 0, 50px 50px",
            opacity: 0.25,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section
            className="text-white py-24 px-6 text-center bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9)), url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80)",
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-5">
              Find Your Perfect Drive
            </h1>

            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
              Experience premium vehicle rentals with AutoMate. Seamless
              booking, transparent pricing, and top-tier customer service.
            </p>

            <Link
              to="/vehicles"
              className="bg-amber-500 hover:bg-amber-600 text-white py-4 px-8 rounded-lg text-lg font-bold transition-colors inline-block"
            >
              Browse Fleet
            </Link>
          </section>

          {/* Featured Vehicles */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                Featured Vehicles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => <VehicleCardSkeleton key={index} />)
                ) : featuredVehicles.length > 0 ? (
                  featuredVehicles.map((vehicle, index) => (
                    <VehicleCard
                      key={vehicle?._id || vehicle?.id || index}
                      vehicle={vehicle}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">
                      No featured vehicles available.
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/vehicles"
                  className="text-amber-600 font-bold hover:text-amber-700 text-lg transition-colors"
                >
                  View All Vehicles →
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 px-6 bg-white/90">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-16">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    step: "1",
                    title: "Choose Location & Date",
                    desc: "Select your preferred pick-up location and travel dates.",
                  },
                  {
                    step: "2",
                    title: "Select Your Car",
                    desc: "Browse our diverse fleet and find the perfect match for your needs.",
                  },
                  {
                    step: "3",
                    title: "Book & Drive",
                    desc: "Complete your booking securely and hit the road with confidence.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold mb-5 shadow-lg shadow-amber-500/30">
                      {item.step}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 max-w-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Home;
