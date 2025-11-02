import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSweetModal from '../components/AddSweetModal';
import EditSweetModal from '../components/EditSweetModal';
import SweetCard from '../components/SweetCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const MyProducts = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchMySweets();
  }, [user, navigate]);

  const fetchMySweets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/sweets/my/products');
      setSweets(data.data || []);
    } catch (error) {
      console.error('Error fetching my sweets:', error);
      setSweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchMySweets();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">🏪 My Products</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-purple-600">
              🏠 Shop
            </button>
            <button onClick={() => navigate('/admin')} className="text-gray-700 hover:text-purple-600">
              📊 Analytics
            </button>
            <span className="text-gray-700">{user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Products ({sweets.length})</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Add New Sweet
          </button>
        </div>

        {sweets.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">🍬</div>
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="mb-4">Start by adding your first sweet product!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Your First Sweet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map(sweet => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                canEdit={true}
                onEdit={setEditingSweet}
                onDelete={handleDelete}
                onSweetUpdate={fetchMySweets}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchMySweets}
        />
      )}

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSuccess={fetchMySweets}
        />
      )}
    </div>
  );
};

export default MyProducts;