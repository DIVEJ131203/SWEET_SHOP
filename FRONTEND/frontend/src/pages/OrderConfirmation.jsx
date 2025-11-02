import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed! 🎉</h1>
            <p className="text-gray-600">Thank you for your order. We'll start preparing your sweets right away!</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order Number:</span>
                <p className="font-semibold">{order?.orderNumber || orderId}</p>
              </div>
              <div>
                <span className="text-gray-600">Order Date:</span>
                <p className="font-semibold">{order ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <p className="font-semibold">₹{order?.totalAmount?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-semibold text-yellow-600">{order?.status || 'Processing'}</p>
              </div>
              <div>
                <span className="text-gray-600">Estimated Delivery:</span>
                <p className="font-semibold">{order ? new Date(order.estimatedDelivery).toLocaleDateString() : '3-5 business days'}</p>
              </div>
            </div>
          </div>

          {order && order.items && order.items.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-lg">🍬</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 font-semibold transition-colors"
            >
              Track Your Order
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;