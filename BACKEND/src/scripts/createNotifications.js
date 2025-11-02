import mongoose from 'mongoose';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const createSampleNotifications = async () => {
  try {
    // Get a user to create notifications for
    const user = await User.findOne({ email: 'user@sweetshop.com' });
    const admin = await User.findOne({ email: 'admin@sweetshop.com' });
    
    if (!user || !admin) {
      console.log('❌ Users not found. Please run the seed script first.');
      return;
    }

    // Clear existing notifications
    await Notification.deleteMany({});
    console.log('🗑️ Cleared existing notifications');

    // Create sample notifications for regular user
    const userNotifications = [
      {
        user: user._id,
        title: 'Welcome to Sweet Shop! 🍬',
        message: 'Thank you for joining our sweet community. Enjoy browsing our delicious collection of treats!',
        type: 'system'
      },
      {
        user: user._id,
        title: 'Order Placed Successfully 📦',
        message: 'Your order #SS12345678 has been placed and will be processed within 24 hours.',
        type: 'order'
      },
      {
        user: user._id,
        title: 'Special Offer Available! 🎫',
        message: 'Use code SWEET20 to get 20% off on your next order. Valid until end of month!',
        type: 'promotion'
      },
      {
        user: user._id,
        title: 'Items Back in Stock 📊',
        message: 'Good news! The Chocolate Truffles you were interested in are back in stock.',
        type: 'inventory'
      }
    ];

    // Create sample notifications for admin
    const adminNotifications = [
      {
        user: admin._id,
        title: 'New Order Received 🔔',
        message: 'A new order #SS87654321 has been placed and requires your attention.',
        type: 'order'
      },
      {
        user: admin._id,
        title: 'Low Stock Alert ⚠️',
        message: '5 items are running low on stock and need restocking soon.',
        type: 'inventory'
      },
      {
        user: admin._id,
        title: 'Daily Sales Report 📈',
        message: 'Your daily sales report is ready. Total revenue: ₹2,450 from 12 orders.',
        type: 'system'
      }
    ];

    // Insert all notifications
    await Notification.insertMany([...userNotifications, ...adminNotifications]);
    
    console.log('✅ Sample notifications created successfully!');
    console.log(`📧 Created ${userNotifications.length} notifications for user: ${user.email}`);
    console.log(`📧 Created ${adminNotifications.length} notifications for admin: ${admin.email}`);
    
  } catch (error) {
    console.error('❌ Error creating notifications:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
connectDB().then(() => {
  createSampleNotifications();
});