import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword({ email: email.trim().toLowerCase() });
      toast.success("Reset instructions sent to your email.");
      setSubmitted(true);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send reset email.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
        </div>
        {submitted ? (
          <div className="text-center text-green-600">
            <p className="font-medium">Check your email for reset instructions.</p>
            <Link to="/auth/login" className="text-amber-600 hover:text-amber-500 font-medium mt-4 inline-block">
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading} className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'opacity-60 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'}`}>
              Send Reset Link
            </button>
            <div className="text-center text-sm">
              <Link to="/auth/login" className="font-medium text-amber-600 hover:text-amber-500">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
