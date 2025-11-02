import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const discount = couponDiscount;
  const total = subtotal + shipping - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: couponCode,
          cartTotal: subtotal
        })
      });

      const data = await response.json();

      if (data.success) {
        setCouponDiscount(data.data.discount);
        setCouponApplied(true);
        alert(`Coupon applied! You saved ₹${data.data.discount}`);
      } else {
        alert(data.message || 'Invalid coupon code');
      }
    } catch (error) {
      alert('Failed to apply coupon');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponApplied(false);
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Please fill in all shipping address fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress,
          notes: '',
          couponCode: couponApplied ? couponCode : null,
          discount: couponDiscount
        })
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        alert('Order placed successfully! 🎉');
        
        // Show browser notification if supported
        try {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🛒 Order Placed Successfully!', {
              body: `Your order #${data.data.orderNumber} has been placed and will be processed soon.`,
              icon: '/favicon.ico'
            });
          }
        } catch (error) {
          console.log('Notification error:', error);
        }
        
        navigate(`/order-confirmation/${data.data._id}`);
      } else {
        alert('Error: ' + (data.message || 'Order placement failed'));
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Error: Order placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {(item.imageUrl || item.imageFromUrl) ? (
                        <img
                          src={item.imageFromUrl || `http://localhost:5000${item.imageUrl}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span 
                        className={`text-lg ${(item.imageUrl || item.imageFromUrl) ? 'hidden' : 'flex'}`}
                        style={{ display: (item.imageUrl || item.imageFromUrl) ? 'none' : 'flex' }}
                      >
                        {item.emoji || '🍬'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({couponCode}):</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Have a coupon?</h3>
                {!couponApplied ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700">Coupon "{couponCode}" applied!</span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 mt-6 transition-colors"
                >
                  {loading ? 'Placing Order...' : `Place Order - ₹${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;