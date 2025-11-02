import { useEffect, useState } from 'react';
import api from '../services/api';

const LowStockManagement = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchSweets();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchSweets, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/sweets');
      setSweets(data.data || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const restockSweet = async (sweetId, quantity) => {
    try {
      await api.post(`/sweets/${sweetId}/restock`, { quantity });
      alert(`Successfully restocked with ${quantity} items! 📦`);
      fetchSweets();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to restock'));
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: '❌' };
    if (quantity <= 5) return { status: 'Critical', color: 'bg-red-100 text-red-800', icon: '🚨' };
    if (quantity <= lowStockThreshold) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800', icon: '✅' };
  };

  const lowStockItems = sweets.filter(sweet => sweet.quantity <= lowStockThreshold);
  const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0);
  const criticalStockItems = sweets.filter(sweet => sweet.quantity > 0 && sweet.quantity <= 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p className="text-gray-600 ml-4">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Inventory Management</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Low Stock Threshold:</label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(Math.max(1, parseInt(e.target.value) || 10))}
              className="w-20 px-2 py-1 border rounded text-sm"
              min="1"
            />
          </div>
          <button
            onClick={fetchSweets}
            disabled={loading}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm"
          >
            🔄 {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{sweets.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{outOfStockItems.length}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{criticalStockItems.length}</div>
            <div className="text-sm text-gray-600">Critical Stock</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <div className="text-sm text-gray-600">Low Stock Items</div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {(outOfStockItems.length > 0 || criticalStockItems.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Urgent Attention Required</h3>
          {outOfStockItems.length > 0 && (
            <p className="text-red-700 mb-1">
              <strong>{outOfStockItems.length}</strong> items are completely out of stock
            </p>
          )}
          {criticalStockItems.length > 0 && (
            <p className="text-red-700">
              <strong>{criticalStockItems.length}</strong> items have critical stock levels (≤5 items)
            </p>
          )}
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">
            Inventory Status ({sweets.length} items)
          </h3>
        </div>
        
        {sweets.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <p>No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sweets
                  .sort((a, b) => a.quantity - b.quantity) // Sort by stock level (lowest first)
                  .map((sweet) => {
                    const stockInfo = getStockStatus(sweet.quantity);
                    return (
                      <tr key={sweet._id} className={sweet.quantity <= 5 ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">
                              {sweet.emoji || '🍬'}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {sweet.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {sweet.description?.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sweet.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            {sweet.quantity} units
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockInfo.color}`}>
                            {stockInfo.icon} {stockInfo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{sweet.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <RestockModal sweet={sweet} onRestock={restockSweet} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Restock Modal Component
const RestockModal = ({ sweet, onRestock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(50);

  const handleRestock = () => {
    onRestock(sweet._id, quantity);
    setIsOpen(false);
    setQuantity(50);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-purple-600 hover:text-purple-900"
      >
        📦 Restock
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Restock {sweet.name}</h3>
            <p className="text-gray-600 mb-4">
              Current stock: <strong>{sweet.quantity} units</strong>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Quantity to add:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
              />
              <p className="text-sm text-gray-500 mt-1">
                New total: {sweet.quantity + quantity} units
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRestock}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LowStockManagement;