import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: '👤' },
    { id: 'orders', name: 'My Orders', icon: '📦' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' }
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      const userData = data.data;
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India'
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/auth/profile', profileData);
      alert('Profile updated successfully! ✅');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to update profile'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-600 hover:text-purple-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-purple-600">👤 My Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.name}</span>
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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-600">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mt-2">
                  {user?.role === 'admin' ? '👑 Admin' : '🍬 Customer'}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="flex border-b">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-purple-500 text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <p className="text-gray-600">Change your password and security settings here.</p>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">My Orders</h3>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-gray-600 mb-4">View and manage your orders</p>
                  <button
                    onClick={() => navigate('/orders')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                  >
                    View All Orders
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <p className="text-gray-600">Manage your notification and display preferences.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;