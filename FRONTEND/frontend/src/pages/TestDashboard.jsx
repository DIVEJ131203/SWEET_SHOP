import { useAuth } from '../context/AuthContext';

const TestDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard Test</h2>
          <p>If you can see this, the basic dashboard is working!</p>
          <p>User: {user?.name}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;