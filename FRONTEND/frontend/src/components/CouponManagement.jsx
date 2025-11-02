import { useEffect, useState } from 'react';
import api from '../services/api';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscount: '',
    expiryDate: '',
    usageLimit: '',
    isActive: true
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/coupons');
      setCoupons(data.data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/coupons', {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        maxDiscount: parseFloat(formData.maxDiscount) || null,
        usageLimit: parseInt(formData.usageLimit) || null
      });
      
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderAmount: '',
        maxDiscount: '',
        expiryDate: '',
        usageLimit: '',
        isActive: true
      });
      setShowAddForm(false);
      fetchCoupons();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create coupon');
    }
  };

  const toggleCouponStatus = async (id, currentStatus) => {
    try {
      await api.put(`/coupons/${id}`, { isActive: !currentStatus });
      fetchCoupons();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update coupon');
    }
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await api.delete(`/coupons/${id}`);
      fetchCoupons();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete coupon');
    }
  };

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coupon Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          {showAddForm ? 'Cancel' : '+ Add Coupon'}
        </button>
      </div>

      {/* Add Coupon Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Coupon</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Coupon Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., SAVE20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Discount Type</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Value {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                max={formData.discountType === 'percentage' ? '100' : undefined}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Min Order Amount (₹)</label>
              <input
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
              />
            </div>

            {formData.discountType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium mb-1">Max Discount (₹)</label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Usage Limit</label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                placeholder="Leave empty for unlimited"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">All Coupons ({coupons.length})</h3>
        </div>
        
        {coupons.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">🎫</div>
            <p>No coupons created yet</p>
          </div>
        ) : (
          <div className="divide-y">
            {coupons.map(coupon => (
              <div key={coupon._id} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono font-bold text-lg bg-purple-100 text-purple-800 px-3 py-1 rounded">
                      {coupon.code}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Discount:</strong> {coupon.discountType === 'percentage' 
                        ? `${coupon.discountValue}%` 
                        : `₹${coupon.discountValue}`}
                      {coupon.maxDiscount && ` (max ₹${coupon.maxDiscount})`}
                    </p>
                    <p><strong>Min Order:</strong> ₹{coupon.minOrderAmount}</p>
                    <p><strong>Expires:</strong> {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                    <p>
                      <strong>Usage:</strong> {coupon.usedCount || 0}
                      {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ' (unlimited)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCouponStatus(coupon._id, coupon.isActive)}
                    className={`px-3 py-1 rounded text-sm ${
                      coupon.isActive 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteCoupon(coupon._id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Delete
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

export default CouponManagement;