import { useEffect, useState } from 'react';
import api from '../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      setOrders(data.data || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      
      // Show success message
      const statusMessages = {
        'Confirmed': 'Order confirmed successfully! Customer will be notified. ✅',
        'Processing': 'Order moved to processing. Preparing items... ⚙️',
        'Shipped': 'Order marked as shipped! Tracking info sent to customer. 🚚',
        'Delivered': 'Order marked as delivered. Thank you! 📦',
        'Cancelled': 'Order cancelled. Customer will be notified. ❌'
      };
      
      alert(statusMessages[newStatus] || `Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to update order status'));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-indigo-100 text-indigo-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'processing': return '⚙️';
      case 'shipped': return '🚚';
      case 'delivered': return '📦';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Order Management</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm"
          >
            🔄 {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {['all', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].map(status => {
          const count = status === 'all' ? orders.length : orders.filter(o => o.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{status === 'all' ? 'Total' : status} Orders</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">
            {statusFilter === 'all' ? 'All Orders' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`} 
            ({filteredOrders.length})
          </h3>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <p>No orders found</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredOrders.map(order => (
              <div key={order._id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">Order #{order.orderNumber}</h4>
                    <p className="text-gray-600">
                      Customer: {order.user?.name || 'Unknown'} ({order.user?.email || 'No email'})
                    </p>
                    <p className="text-gray-600">
                      Placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      ₹{order.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Items ({order.items?.length || 0})</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <span>{item.sweet?.emoji || '🍬'}</span>
                        <span>{item.sweet?.name || 'Unknown Item'}</span>
                        <span className="text-gray-600">×{item.quantity}</span>
                        <span className="text-gray-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-1">Shipping Address</h5>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.fullName}<br/>
                      {order.shippingAddress.address}<br/>
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                      {order.shippingAddress.country}<br/>
                      Phone: {order.shippingAddress.phone}
                    </p>
                  </div>
                )}

                {/* Status Update Actions */}
                <div className="flex flex-wrap gap-2">
                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Confirmed')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        ✅ Confirm Order
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        ❌ Cancel Order
                      </button>
                    </>
                  )}
                  
                  {order.status === 'Confirmed' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Processing')}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200"
                      >
                        ⚙️ Start Processing
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        ❌ Cancel Order
                      </button>
                    </>
                  )}

                  {order.status === 'Processing' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Shipped')}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
                    >
                      🚚 Mark as Shipped
                    </button>
                  )}
                  
                  {order.status === 'Shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Delivered')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                    >
                      📦 Mark as Delivered
                    </button>
                  )}

                  {/* Status Dropdown for Quick Changes */}
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                    📄 View Details
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                    🖨️ Print Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;