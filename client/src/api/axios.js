import axios from 'axios';

const isProd = import.meta.env.PROD;
const PRODUCTION_API_URL = 'https://automate-server-backend-5cvz.onrender.com/api';

// In production builds, always use the production URL.
// VITE_API_URL is only respected in development (local dev server).
// This prevents the local .env VITE_API_URL=http://localhost:5001 from being
// baked into the production bundle by Vite's static env replacement.
let apiURL;
if (isProd) {
  apiURL = PRODUCTION_API_URL;
} else {
  const devUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  apiURL = devUrl.endsWith('/api') ? devUrl : `${devUrl.replace(/\/$/, '')}/api`;
}

const API = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('automate_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('automate_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export default API;
