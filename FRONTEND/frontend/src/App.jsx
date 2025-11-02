import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyProducts from './pages/MyProducts';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import Register from './pages/Register';
import SweetDetails from './pages/SweetDetails';
import UserProfile from './pages/UserProfile';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  // Initialize push notifications on app start
  useEffect(() => {
    console.log('App initialized');
    // Request notification permission when app loads (optional)
    try {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          console.log('Notification permission:', permission);
        });
      }
    } catch (error) {
      console.log('Push notification not supported:', error);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/sweet/:id" element={<PrivateRoute><SweetDetails /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
              <Route path="/my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />
              <Route path="/order-confirmation/:orderId" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
              <Route path="/profile/*" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
