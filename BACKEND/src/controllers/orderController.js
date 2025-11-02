import Cart from '../models/Cart.js';
import Notification from '../models/Notification.js';
import Order from '../models/Order.js';
import Sweet from '../models/Sweet.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, notes } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.sweet');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Check stock availability
    for (const item of cart.items) {
      if (item.sweet.quantity < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${item.sweet.name}` 
        });
      }
    }

    // Create order items
    const orderItems = cart.items.map(item => ({
      sweet: item.sweet._id,
      name: item.sweet.name,
      price: item.price,
      quantity: item.quantity,
      image: item.sweet.image
    }));

    // Calculate estimated delivery (3-5 business days)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Generate unique order number
    const timestamp = Date.now().toString();
    const orderNumber = 'SS' + timestamp.slice(-8);

    const order = await Order.create({
      user: req.user.id,
      orderNumber,
      items: orderItems,
      totalAmount: cart.totalAmount,
      totalItems: cart.totalItems,
      shippingAddress,
      notes,
      estimatedDelivery
    });

    // Update sweet quantities
    for (const item of cart.items) {
      await Sweet.findByIdAndUpdate(
        item.sweet._id,
        { $inc: { quantity: -item.quantity } }
      );
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    // Create notification for customer
    await Notification.create({
      user: req.user.id,
      title: 'Order Placed Successfully 📦',
      message: `Your order #${order.orderNumber} has been placed and will be delivered in 3-5 business days.`,
      type: 'order',
      data: { orderId: order._id }
    });

    // Create notification for admin
    const adminUsers = await User.find({ role: 'admin' });
    for (const admin of adminUsers) {
      await Notification.create({
        user: admin._id,
        title: 'New Order Received 🔔',
        message: `A new order #${order.orderNumber} has been placed by ${req.user.name} for ₹${order.totalAmount}.`,
        type: 'order',
        data: { orderId: order._id }
      });
    }

    await order.populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.sweet', 'name image');

    const total = await Order.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('items.sweet', 'name image');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Admin functions
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let query = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email')
      .populate('items.sweet', 'name image');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Create notification for status update with appropriate message
    const statusMessages = {
      'Confirmed': `Great news! Your order #${order.orderNumber} has been confirmed and is being prepared. 🎉`,
      'Processing': `Your order #${order.orderNumber} is now being processed. We're preparing your sweet treats! ⚙️`,
      'Shipped': `Your order #${order.orderNumber} has been shipped! Track your package for delivery updates. 🚚`,
      'Delivered': `Your order #${order.orderNumber} has been delivered! We hope you enjoy your sweets! 📦`,
      'Cancelled': `Your order #${order.orderNumber} has been cancelled. If you have questions, please contact us. ❌`
    };

    await Notification.create({
      user: order.user._id,
      title: 'Order Status Updated',
      message: statusMessages[status] || `Your order #${order.orderNumber} status has been updated to ${status}.`,
      type: 'order',
      data: { orderId: order._id, status }
    });

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    console.log('📊 Admin stats requested by user:', req.user?.email, 'Role:', req.user?.role);
    
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const completedOrders = await Order.countDocuments({ status: 'Delivered' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    const stats = {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders
    };

    console.log('📊 Stats calculated:', stats);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Error in getOrderStats:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};