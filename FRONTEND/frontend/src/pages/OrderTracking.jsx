import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const OrderTracking = () => {
  const { user, logout } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    fetchOrders();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    
    // Refresh when page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchOrders();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders/my-orders');
      setOrders(data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      setSelectedOrder(data.data);
      setShowOrderDetails(true);
    } catch (error) {
      alert('Error: Failed to load order details');
      console.error('Error fetching order details:', error);
    }
  };

  const handleReorder = async (order) => {
    setReordering(true);
    try {
      let successCount = 0;
      let failedItems = [];

      for (const item of order.items) {
        try {
          // First, try to fetch the current sweet data to ensure it's still available
          const sweetId = item.sweet?._id || item.sweet;
          
          let sweetData;
          try {
            const { data } = await api.get(`/sweets/${sweetId}`);
            sweetData = data.data;
          } catch (error) {
            // If sweet doesn't exist anymore, use the order item data
            sweetData = {
              _id: sweetId,
              name: item.name,
              price: item.price,
              imageUrl: item.image,
              emoji: '🍬'
            };
          }
          
          await addItem(sweetData, item.quantity);
          successCount++;
        } catch (error) {
          console.error(`Failed to add ${item.name}:`, error);
          failedItems.push(item.name);
        }
      }

      if (successCount > 0) {
        alert(`Successfully added ${successCount} items to cart! 🛒`);
        if (failedItems.length > 0) {
          alert(`Note: Some items couldn't be added (may be out of stock): ${failedItems.join(', ')}`);
        }
      } else {
        alert('Error: Failed to add items to cart. Items may be out of stock or unavailable.');
      }
    } catch (error) {
      alert('Error: Failed to reorder items');
      console.error('Error reordering items:', error);
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">📦 My Orders</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-purple-600">
              🏠 Shop
            </button>
            {user?.role === 'admin' && (
              <button onClick={() => navigate('/admin')} className="text-gray-700 hover:text-purple-600">
                📊 Admin
              </button>
            )}
            <span className="text-gray-700">{user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 ml-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="mb-4">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Orders ({orders.length})</h2>
            
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order {order.orderNumber}</h3>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Items ({order.items?.length || 0})</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4 flex space-x-4">
                  <button 
                    onClick={() => handleViewDetails(order._id)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    👁️ View Details
                  </button>
                  <button 
                    onClick={() => handleReorder(order)}
                    disabled={reordering}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium disabled:opacity-50"
                  >
                    {reordering ? '⏳ Adding...' : '🔄 Reorder Items'}
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      ⭐ Write Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Order Number</h3>
                      <p className="text-lg">{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Status</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Order Date</h3>
                      <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Total Amount</h3>
                      <p className="text-lg font-bold text-purple-600">₹{selectedOrder.totalAmount}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Items ({selectedOrder.items?.length || 0})</h3>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">🍬</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">₹{item.price} each</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Qty: {item.quantity}</p>
                          <p className="text-purple-600 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shippingAddress && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                      <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Order Notes</h3>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    disabled={reordering}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {reordering ? '⏳ Adding to Cart...' : '🔄 Reorder All Items'}
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;