import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const SweetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchSweetDetails();
    fetchReviews();
  }, [id]);

  const fetchSweetDetails = async () => {
    try {
      const { data } = await api.get(`/sweets/${id}`);
      setSweet(data.data);
    } catch (error) {
      console.error('Error fetching sweet details:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/sweet/${id}`);
      setReviews(data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addItem(sweet, quantity);
      alert(`Added ${quantity} ${sweet.name}(s) to cart! 🛒`);
    } catch (error) {
      alert('Error: Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sweet details...</p>
        </div>
      </div>
    );
  }

  if (!sweet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Sweet not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 text-gray-600 hover:text-purple-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-purple-600">🍬 Sweet Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image and Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              {(sweet.imageUrl || sweet.imageFromUrl) && !imageError ? (
                <img
                  src={sweet.imageFromUrl || `http://localhost:5000${sweet.imageUrl}`}
                  alt={sweet.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-8xl">
                  {sweet.emoji || '🍬'}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{sweet.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <StarRating rating={sweet.averageRating || 0} readonly />
              <span className="text-gray-600">
                ({sweet.reviewCount || 0} review{sweet.reviewCount !== 1 ? 's' : ''})
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-purple-600">₹{sweet.price}</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {sweet.category}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{sweet.description}</p>

            {sweet.seller && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Seller Information</h3>
                <p className="text-gray-600">Sold by: {sweet.seller.name || 'Sweet Shop'}</p>
              </div>
            )}

            {sweet.quantity !== undefined && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Stock:</span> {sweet.quantity} available
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Math.min(sweet.quantity || 999, parseInt(e.target.value) || 1));
                    setQuantity(value);
                  }}
                  className="w-16 px-2 py-2 text-center border-0 focus:outline-none"
                  min="1"
                  max={sweet.quantity || 999}
                />
                <button
                  onClick={() => setQuantity(Math.min(sweet.quantity || 999, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity >= (sweet.quantity || 999)}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={sweet.quantity <= 0 || quantity <= 0}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  sweet.quantity <= 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {sweet.quantity <= 0 ? 'Out of Stock' : `Add to Cart - ₹${(sweet.price * quantity).toFixed(2)}`}
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
              {user && (
                <button 
                  onClick={() => setShowReviewModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Write a Review
                </button>
              )}
            </div>
            
            {reviews.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">💭</div>
                <p>No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.user?.name || 'Anonymous'}</span>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            sweet={sweet}
            onSuccess={() => {
              fetchReviews();
              fetchSweetDetails(); // Refresh to update rating
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SweetDetails;