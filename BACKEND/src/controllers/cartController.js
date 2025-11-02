import Cart from '../models/Cart.js';
import Sweet from '../models/Sweet.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.sweet');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { sweetId, quantity = 1 } = req.body;

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock' 
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.sweet.toString() === sweetId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        sweet: sweetId,
        quantity,
        price: sweet.price
      });
    }

    await cart.save();
    await cart.populate('items.sweet');

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { sweetId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.sweet.toString() === sweetId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    const sweet = await Sweet.findById(sweetId);
    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock' 
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.sweet');

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { sweetId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    cart.items = cart.items.filter(
      item => item.sweet.toString() !== sweetId
    );

    await cart.save();
    await cart.populate('items.sweet');

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Apply coupon to cart 
export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Import Coupon model directly
    const Coupon = (await import('../models/Coupon.js')).default;
    
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired coupon code'
      });
    }

    // Check if coupon usage limit exceeded
    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit exceeded'
      });
    }

    // Check user usage limit
    const userUsage = coupon.userUsage.find(u => u.user.toString() === req.user.id);
    if (userUsage && userUsage.count >= coupon.userUsageLimit) {
      return res.status(400).json({
        success: false,
        message: 'You have reached the usage limit for this coupon'
      });
    }

    // Check minimum amount
    if (cart.totalAmount < coupon.minimumAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minimumAmount} required`
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (cart.totalAmount * coupon.discountValue) / 100;
      if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
        discount = coupon.maximumDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    // Apply coupon to cart
    cart.coupon = {
      code: coupon.code,
      discount: Math.round(discount * 100) / 100
    };
    
    await cart.save();

    res.json({
      success: true,
      data: cart,
      message: 'Coupon applied successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove coupon from cart
export const removeCoupon = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.coupon = undefined;
    await cart.save();

    res.json({
      success: true,
      data: cart,
      message: 'Coupon removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};