import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function SimpleApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">🍬 Sweet Shop</h1>
          <p className="mb-4">Welcome! Please login or register.</p>
          <div className="space-x-4">
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
            <a href="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</a>
          </div>
        </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>You are logged in!</p>
        </div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SimpleApp;