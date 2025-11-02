import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CouponManagement from '../components/CouponManagement';
import LowStockManagement from '../components/LowStockManagement';
import OrderManagement from '../components/OrderManagement';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
      // Set up auto-refresh every 30 seconds
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching admin stats...');
      const { data } = await api.get('/orders/admin/stats');
      console.log('Stats response:', data);
      setStats(data.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
      console.error('Error details:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">📊 Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchStats} 
              className="text-gray-700 hover:text-purple-600 flex items-center gap-1"
              disabled={loading}
            >
              🔄 {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-purple-600">
              🏠 Shop
            </button>
            <button onClick={() => navigate('/my-products')} className="text-gray-700 hover:text-purple-600">
              🏪 My Products
            </button>
            <span className="text-gray-700">{user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            {lastUpdated && activeTab === 'dashboard' && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📦 Order Management
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inventory'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Inventory Management
              </button>
              <button
                onClick={() => setActiveTab('coupons')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'coupons'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎫 Coupon Management
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div>
            <p className="text-gray-600 mb-8">Manage your sweet shop from here</p>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 ml-4">Loading analytics...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-4">❌ {error}</p>
              <button 
                onClick={fetchStats}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">📦</div>
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.totalOrders}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">⏳</div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Orders</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">✅</div>
                    <div>
                      <p className="text-sm text-gray-600">Completed Orders</p>
                      <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">💰</div>
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/my-products')}>
                  <div className="text-4xl mb-4">🏪</div>
                  <h3 className="text-xl font-bold mb-2">My Products</h3>
                  <p className="text-gray-600">Manage your sweet inventory</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/orders')}>
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-xl font-bold mb-2">Orders</h3>
                  <p className="text-gray-600">Track and manage orders</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/dashboard')}>
                  <div className="text-4xl mb-4">🍬</div>
                  <h3 className="text-xl font-bold mb-2">Shop View</h3>
                  <p className="text-gray-600">View your shop as customers see it</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                {stats.recentOrders && stats.recentOrders.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {stats.recentOrders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-semibold">Order {order.orderNumber}</p>
                            <p className="text-sm text-gray-600">
                              {order.user?.name} • {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">₹{order.totalAmount}</p>
                            <p className="text-sm text-gray-600">{order.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Low Stock Alert Widget */}
                <LowStockWidget onViewInventory={() => setActiveTab('inventory')} />
              </div>
            </>
          )}
          </div>
        )}

        {/* Order Management Tab */}
        {activeTab === 'orders' && (
          <OrderManagement />
        )}

        {/* Inventory Management Tab */}
        {activeTab === 'inventory' && (
          <LowStockManagement />
        )}

        {/* Coupon Management Tab */}
        {activeTab === 'coupons' && (
          <CouponManagement />
        )}
      </div>
    </div>
  );
};

// Low Stock Widget Component
const LowStockWidget = ({ onViewInventory }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLowStockItems();
  }, []);

  const fetchLowStockItems = async () => {
    try {
      const { data } = await api.get('/sweets');
      const lowStock = data.data.filter(sweet => sweet.quantity <= 10);
      setLowStockItems(lowStock.slice(0, 5)); // Show only top 5
    } catch (error) {
      console.error('Error fetching low stock items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">📊 Inventory Alerts</h3>
        <button
          onClick={onViewInventory}
          className="text-purple-600 hover:text-purple-800 text-sm"
        >
          View All →
        </button>
      </div>
      
      {lowStockItems.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          <div className="text-3xl mb-2">✅</div>
          <p>All items are well stocked!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-yellow-800 text-sm">
              <strong>{lowStockItems.length}</strong> items need restocking
            </p>
          </div>
          
          {lowStockItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{item.emoji || '🍬'}</span>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${
                  item.quantity === 0 ? 'text-red-600' : 
                  item.quantity <= 5 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {item.quantity} left
                </p>
                <p className="text-xs text-gray-500">
                  {item.quantity === 0 ? 'Out of stock' : 
                   item.quantity <= 5 ? 'Critical' : 'Low stock'}
                </p>
              </div>
            </div>
          ))}
          
          <button
            onClick={onViewInventory}
            className="w-full mt-4 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 text-sm"
          >
            Manage Inventory
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;