import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, profile, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (profile) updateData.profile = { ...req.user.profile, ...profile };
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const addressData = req.body;
    
    const user = await User.findById(req.user.id);
    
    // If this is the first address or marked as default, make it default
    if (user.addresses.length === 0 || addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
      addressData.isDefault = true;
    }

    user.addresses.push(addressData);
    await user.save();

    res.status(201).json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const addressData = req.body;

    const user = await User.findById(req.user.id);
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ 
        success: false, 
        message: 'Address not found' 
      });
    }

    // If marking as default, unset other defaults
    if (addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    Object.assign(address, addressData);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ 
        success: false, 
        message: 'Address not found' 
      });
    }

    const wasDefault = address.isDefault;
    user.addresses.pull(addressId);

    // If deleted address was default, make first remaining address default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      isRead: false 
    });

    const total = await Notification.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
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

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};