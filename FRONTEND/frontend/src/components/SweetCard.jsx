import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const SweetCard = ({ sweet, isAdmin, canEdit, onEdit, onDelete, onSweetUpdate }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [restocking, setRestocking] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState(10);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);



  const handleRestock = async (e) => {
    e.stopPropagation();
    setRestocking(true);
    try {
      await api.post(`/sweets/${sweet._id}/restock`, { quantity: restockQuantity });
      onSweetUpdate && onSweetUpdate();
      alert(`Successfully restocked ${sweet.name} with ${restockQuantity} items! 📦`);
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to restock item'));
    } finally {
      setRestocking(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (sweet.quantity <= 0 || cartQuantity <= 0) return;
    
    setAddingToCart(true);
    try {
      // Add the specified quantity to cart
      await addItem(sweet, cartQuantity);
      alert(`Added ${cartQuantity} ${sweet.name}(s) to cart! 🛒`);
      setCartQuantity(1); // Reset quantity after adding
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to add to cart'));
    } finally {
      setAddingToCart(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/sweet/${sweet._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div 
        className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center overflow-hidden relative"
        onClick={handleViewDetails}
      >
        {(sweet.imageUrl || sweet.imageFromUrl) ? (
          <img
            src={sweet.imageFromUrl || `http://localhost:5000${sweet.imageUrl}`}
            alt={sweet.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span 
          className={`text-4xl ${(sweet.imageUrl || sweet.imageFromUrl) ? 'hidden' : 'flex'}`}
          style={{ display: (sweet.imageUrl || sweet.imageFromUrl) ? 'none' : 'flex' }}
        >
          {sweet.emoji || '🍬'}
        </span>
        
        {canEdit && (
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(sweet);
              }}
              className="bg-white bg-opacity-90 text-blue-500 hover:text-blue-700 p-1 rounded-full shadow-md"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(sweet._id);
              }}
              className="bg-white bg-opacity-90 text-red-500 hover:text-red-700 p-1 rounded-full shadow-md"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 cursor-pointer hover:text-purple-600" onClick={handleViewDetails}>
          {sweet.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{sweet.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-purple-600">₹{sweet.price}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{sweet.category}</span>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Stock:</span>
            <span className={`font-semibold ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {sweet.quantity} available
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCartQuantity(Math.max(1, cartQuantity - 1));
                }}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg"
                disabled={cartQuantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                value={cartQuantity}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(sweet.quantity || 999, parseInt(e.target.value) || 1));
                  setCartQuantity(value);
                }}
                className="w-16 px-2 py-2 text-center border-0 focus:outline-none"
                min="1"
                max={sweet.quantity || 999}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCartQuantity(Math.min(sweet.quantity || 999, cartQuantity + 1));
                }}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg"
                disabled={cartQuantity >= (sweet.quantity || 999)}
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={sweet.quantity <= 0 || addingToCart || cartQuantity <= 0}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                sweet.quantity <= 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {addingToCart ? 'Adding...' : sweet.quantity <= 0 ? 'Out of Stock' : `Add ${cartQuantity} to Cart`}
            </button>
          </div>

          {isAdmin && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-2 py-1 border rounded text-sm"
                min="1"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={handleRestock}
                disabled={restocking}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                {restocking ? 'Restocking...' : 'Restock'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;