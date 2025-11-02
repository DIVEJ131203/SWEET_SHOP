import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSweetModal from '../components/AddSweetModal';
import CartIcon from '../components/CartIcon';
import CartSidebar from '../components/CartSidebar';
import EditSweetModal from '../components/EditSweetModal';
import NotificationCenter from '../components/NotificationCenter';
import SweetCard from '../components/SweetCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchSweets();
  }, [searchTerm, categoryFilter, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchUnreadCount();
    // Refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const { data } = await api.get('/notifications/unread-count');
      setUnreadCount(data.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchSweets = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        sortBy,
        sortOrder
      });

      if (searchTerm) params.append('name', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);

      const { data } = await api.get(`/sweets/search?${params}`);
      setSweets(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      // Fallback to basic endpoint
      try {
        const { data } = await api.get('/sweets');
        setSweets(data.data || []);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        setSweets([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
      alert('Sweet deleted successfully! 🗑️');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Delete failed'));
    }
  };

  const categories = ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Cookies', 'Cakes', 'Ice Cream', 'Other'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sweets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer" onClick={() => navigate('/dashboard')}>
            🍬 Sweet Shop
          </h1>
          <div className="flex items-center gap-4">
            <CartIcon onClick={() => setShowCartSidebar(true)} />
            
            <button
              onClick={() => {
                setShowNotifications(true);
                setUnreadCount(0); // Reset count when opening notifications
              }}
              className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
              title="Notifications"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H7a2 2 0 01-2-2V7a2 2 0 012-2h5m4 0v6m0 0v6m0-6h6m-6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => navigate('/my-products')}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  title="My Products"
                >
                  🏪 My Products
                </button>
                <button
                  onClick={() => navigate('/admin')}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  title="Admin Dashboard"
                >
                  📊 Analytics
                </button>
              </>
            )}
            
            <button
              onClick={() => navigate('/orders')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
              title="My Orders"
            >
              📦 Orders
            </button>
            
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
              title="Profile"
            >
              👤 Profile
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-sm">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
            </select>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                + Add Sweet
              </button>
            )}
          </div>
        </div>

        {/* Sweets Grid */}
        {sweets.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">🍬</div>
            <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
            <p>Try adjusting your search or filters</p>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Your First Sweet
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sweets.map(sweet => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  isAdmin={user?.role === 'admin'}
                  canEdit={user && (user.role === 'admin' || sweet.seller?._id === user._id)}
                  onEdit={setEditingSweet}
                  onDelete={handleDelete}
                  onSweetUpdate={fetchSweets}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-purple-600 text-white'
                            : 'border hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
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

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        onCheckout={() => {
          setShowCartSidebar(false);
          navigate('/checkout');
        }}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default Dashboard;