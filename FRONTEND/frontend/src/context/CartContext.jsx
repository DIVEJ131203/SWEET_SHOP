import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalAmount: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], totalAmount: 0, totalItems: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addItem = async (sweet, quantity = 1) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sweetId: sweet._id,
          quantity: quantity
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (sweetId) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cart/remove/${sweetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (sweetId, quantity) => {
    if (!user) return;
    
    if (quantity <= 0) {
      removeItem(sweetId);
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cart/update/${sweetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cart.finalAmount || cart.totalAmount || 0;
  };

  const getTotalItems = () => {
    return cart.totalItems || 0;
  };

  // Transform backend cart items to match frontend expectations
  const items = cart.items?.map(item => ({
    _id: item.sweet?._id || item.sweet,
    name: item.sweet?.name || 'Unknown Sweet',
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.sweet?.imageUrl,
    imageFromUrl: item.sweet?.imageFromUrl,
    emoji: item.sweet?.emoji || '🍬'
  })) || [];

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      loading,
      cart
    }}>
      {children}
    </CartContext.Provider>
  );
};