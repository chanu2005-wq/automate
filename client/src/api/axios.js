import axios from 'axios';

const isProd = import.meta.env.PROD;
const fallbackUrl = isProd 
  ? 'https://automate-server-backend-5cvz.onrender.com/api' 
  : 'http://localhost:5001/api';

let apiURL = import.meta.env.VITE_API_URL || fallbackUrl;
if (apiURL && !apiURL.endsWith('/api')) {
  apiURL = `${apiURL.replace(/\/$/, '')}/api`;
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
