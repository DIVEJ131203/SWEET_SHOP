import { useEffect, useState } from 'react';
import AddSweetModal from '../components/AddSweetModal';
import EditSweetModal from '../components/EditSweetModal';
import SweetCard from '../components/SimpleSweetCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SimpleDashboard = () => {
  const { user, logout } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const { data } = await api.get('/sweets');
      setSweets(data.data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch (error) {
      alert(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const filteredSweets = sweets.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || sweet.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Cookies', 'Cakes', 'Ice Cream', 'Other'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">🍬 Sweet Shop</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                + Add Sweet
              </button>
            )}
          </div>
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">🍬</div>
            <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map(sweet => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                isAdmin={user?.role === 'admin'}
                onPurchase={handlePurchase}
                onEdit={setEditingSweet}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchSweets}
        />
      )}

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSuccess={fetchSweets}
        />
      )}
    </div>
  );
};

export default SimpleDashboard;