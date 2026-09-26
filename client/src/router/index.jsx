import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import CustomerLayout from "../components/layout/CustomerLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Public Pages
import Home from "../pages/Home";
import Vehicles from "../pages/Vehicles";
import VehicleDetail from "../pages/VehicleDetail";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Protected Pages
import Booking from "../pages/Booking";
import Checkout from "../pages/Checkout";
import BookingConfirmation from "../pages/BookingConfirmation";
import MyBookings from "../pages/MyBookings";
import Invoice from "../pages/Invoice";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AdminVehicles from "../pages/admin/AdminVehicles";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminReports from "../pages/admin/AdminReports";

// ============================================
// PROTECTED ROUTE
// ============================================

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PROTECTED ROUTE USER:", user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    console.log("❌ User is not logged in");

    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// ============================================
// ADMIN ROUTE
// ============================================

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Debug information
  console.log("ADMIN ROUTE USER:", user);
  console.log("USER ROLE:", user?.role);

  // Still checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    console.log("❌ No user found");

    return <Navigate to="/auth/login" replace />;
  }

  // User is logged in but is not admin
  if (user.role !== "admin") {
    console.log("❌ Admin access denied");
    console.log("Current role:", user.role);

    return <Navigate to="/" replace />;
  }

  // User is admin
  console.log("✅ Admin access granted");

  return children;
};

// ============================================
// ROUTER
// ============================================

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "vehicles",
        element: <Vehicles />,
      },

      {
        path: "vehicles/:id",
        element: <VehicleDetail />,
      },

      // Authentication
      {
        path: "auth/login",
        element: <Login />,
      },

      {
        path: "auth/register",
        element: <Register />,
      },

      {
        path: "auth/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "auth/reset-password/:token",
        element: <ResetPassword />,
      },

      // Protected Customer Routes
      {
        path: "booking/:vehicleId",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout/:bookingId",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "booking-confirmation/:bookingId",
        element: (
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        ),
      },

      {
        path: "my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },

      {
        path: "my-bookings/:id/invoice",
        element: (
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ============================================
  // ADMIN ROUTES
  // ============================================

  {
    path: "/admin",

    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "vehicles",
        element: <AdminVehicles />,
      },

      {
        path: "bookings",
        element: <AdminBookings />,
      },

      {
        path: "customers",
        element: <AdminCustomers />,
      },

      {
        path: "payments",
        element: <AdminPayments />,
      },

      {
        path: "reviews",
        element: <AdminReviews />,
      },

      {
        path: "reports",
        element: <AdminReports />,
      },
    ],
  },

  // 404
  {
    path: "*",
    element: (
      <div className="p-20 text-center text-charcoal-900 text-2xl font-bold">
        404 - Page Not Found
      </div>
    ),
  },
]);

export default router;
