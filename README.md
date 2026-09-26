# AutoMate - Vehicle Rental System

Full-stack vehicle rental SaaS built with React + Vite (frontend) and Express.js (backend) + MongoDB.

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS v3, React Router v6, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Auth, bcryptjs

## Prerequisites
- Node.js (v18+)
- MongoDB running locally or MongoDB Atlas URI

## Getting Started

### 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI and other variables
node seed.js # Seed the database with mock vehicles, users, etc.
npm start # Starts the server on port 5000
```

### 2. Frontend Setup
```bash
cd client
npm install
cp .env.example .env
npm run dev # Starts the client on port 5173
```

## Features
- **User Authentication**: Register, Login, Forgot/Reset password
- **Vehicle Catalog**: Browse featured vehicles, sort, filter by category
- **Booking Flow**: Select dates, preview pricing, create booking, mock payment logic
- **Admin Dashboard**: Manage vehicles, view revenue and bookings charts, manage customers and payments
- **My Bookings**: View past and upcoming rentals
- **Invoice**: Print-ready invoices for completed bookings
