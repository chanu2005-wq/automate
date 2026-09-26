import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to where they came from, or home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email: email.trim().toLowerCase(), password });

      if (res?.success) {
        toast.success("Welcome back!");
        // Redirect admin to admin panel, others to their intended destination
        if (res?.data?.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(res?.message || "Invalid email or password.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={handleSubmit}>
        <p>
          Welcome,
          <span>sign in to continue</span>
        </p>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            {error}
          </div>
        )}

        {/* Separator */}
        <div className="separator">
          <div></div>
          <span>Sign in with email</span>
          <div></div>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password"
        />

        {/* Forgot Password */}
        <div className="forgot-password">
          <Link to="/auth/forgot-password">Forgot your password?</Link>
        </div>

        {/* Submit */}
        <button type="submit" className="oauthButton" disabled={loading}>
          {loading ? "Signing in..." : "Continue"}
          {!loading && (
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          )}
        </button>

        {/* Register */}
        <div className="register-text">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
