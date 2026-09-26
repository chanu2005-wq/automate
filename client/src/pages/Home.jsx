import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "../components/vehicles/VehicleCard";
import VehicleCardSkeleton from "../components/vehicles/VehicleCardSkeleton";
import AnimatedPage from "../components/common/AnimatedPage";

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Load Vanta Waves
  useEffect(() => {
    let threeScript;
    let vantaScript;

    const loadVanta = () => {
      if (!window.VANTA || !vantaRef.current) return;

      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xaa701b,
      });
    };

    // Load Three.js first
    if (!window.THREE) {
      threeScript = document.createElement("script");
      threeScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.async = true;

      threeScript.onload = () => {
        // Then load Vanta
        vantaScript = document.createElement("script");
        vantaScript.src =
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
        vantaScript.async = true;

        vantaScript.onload = loadVanta;

        document.body.appendChild(vantaScript);
      };

      document.body.appendChild(threeScript);
    } else if (!window.VANTA) {
      vantaScript = document.createElement("script");
      vantaScript.src =
        "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
      vantaScript.async = true;

      vantaScript.onload = loadVanta;

      document.body.appendChild(vantaScript);
    } else {
      loadVanta();
    }

    // Cleanup Vanta when leaving page
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }

      if (threeScript) {
        threeScript.remove();
      }

      if (vantaScript) {
        vantaScript.remove();
      }
    };
  }, []);

  // Load featured vehicles
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
      <div ref={vantaRef} className="relative min-h-screen overflow-hidden">
        {/* Vanta Waves Background */}

        {/* Existing background overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[#fff7ed]/30" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section
            className="text-white py-24 px-6 text-center bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(31, 41, 55, 0.85), rgba(31, 41, 55, 0.85)), url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80)",
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
