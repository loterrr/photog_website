import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<div className="text-center py-20">About Page Coming Soon</div>} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="booking" element={<Booking />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
