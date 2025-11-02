import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Simple working dashboard
const SimpleDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">🍬 Sweet Shop</h1>
          <p className="text-gray-600 mb-8">Welcome to our sweet shop!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🍫</div>
              <h3 className="text-xl font-bold mb-2">Chocolate</h3>
              <p className="text-gray-600">Delicious chocolates</p>
              <p className="text-2xl font-bold text-purple-600 mt-4">₹50</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🍭</div>
              <h3 className="text-xl font-bold mb-2">Lollipop</h3>
              <p className="text-gray-600">Sweet lollipops</p>
              <p className="text-2xl font-bold text-purple-600 mt-4">₹25</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🧁</div>
              <h3 className="text-xl font-bold mb-2">Cupcake</h3>
              <p className="text-gray-600">Fluffy cupcakes</p>
              <p className="text-2xl font-bold text-purple-600 mt-4">₹75</p>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 mr-4">
              🛒 Add to Cart
            </button>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
              👤 Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function WorkingApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SimpleDashboard />} />
        <Route path="/dashboard" element={<SimpleDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default WorkingApp;