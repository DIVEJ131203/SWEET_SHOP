import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Sweet from '../models/Sweet.js';
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

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Sweet.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sweetshop.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 12);
    const user = await User.create({
      name: 'Regular User',
      email: 'user@sweetshop.com',
      password: userPassword,
      role: 'user'
    });

    console.log('👥 Created users');

    // Create sample sweets
    const sweets = [
      {
        name: 'Chocolate Truffle',
        description: 'Rich and creamy chocolate truffle made with premium cocoa',
        price: 150,
        category: 'Chocolate',
        quantity: 50,
        emoji: '🍫',
        imageFromUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',
        seller: admin._id,
        averageRating: 4.5,
        reviewCount: 12
      },
      {
        name: 'Strawberry Cake',
        description: 'Fresh strawberry cake with whipped cream and real strawberries',
        price: 250,
        category: 'Cakes',
        quantity: 25,
        emoji: '🍰',
        imageFromUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
        seller: admin._id,
        averageRating: 4.8,
        reviewCount: 8
      },
      {
        name: 'Vanilla Cookies',
        description: 'Crispy vanilla cookies baked to perfection',
        price: 80,
        category: 'Cookies',
        quantity: 100,
        emoji: '🍪',
        imageFromUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
        seller: admin._id,
        averageRating: 4.2,
        reviewCount: 15
      },
      {
        name: 'Rainbow Lollipops',
        description: 'Colorful rainbow lollipops that taste as good as they look',
        price: 45,
        category: 'Lollipops',
        quantity: 200,
        emoji: '🍭',
        imageFromUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
        seller: admin._id,
        averageRating: 4.0,
        reviewCount: 22
      },
      {
        name: 'Gummy Bears',
        description: 'Soft and chewy gummy bears in assorted flavors',
        price: 120,
        category: 'Gummies',
        quantity: 75,
        emoji: '🐻',
        imageFromUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
        seller: admin._id,
        averageRating: 4.3,
        reviewCount: 18
      },
      {
        name: 'Chocolate Fudge',
        description: 'Decadent chocolate fudge made with real butter and cream',
        price: 180,
        category: 'Fudge',
        quantity: 40,
        emoji: '🟫',
        imageFromUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        seller: admin._id,
        averageRating: 4.7,
        reviewCount: 9
      },
      {
        name: 'Cupcakes',
        description: 'Fluffy cupcakes with buttercream frosting',
        price: 95,
        category: 'Cakes',
        quantity: 60,
        emoji: '🧁',
        imageFromUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400',
        seller: admin._id,
        averageRating: 4.4,
        reviewCount: 14
      },
      {
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with chocolate sauce and cherry on top',
        price: 220,
        category: 'Ice Cream',
        quantity: 30,
        emoji: '🍨',
        imageFromUrl: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400',
        seller: admin._id,
        averageRating: 4.6,
        reviewCount: 11
      }
    ];

    const createdSweets = await Sweet.insertMany(sweets);
    console.log('🍬 Created sample sweets');

    // Create sample orders
    const sampleOrders = [
      {
        user: user._id,
        orderNumber: 'SS12345678',
        items: [
          {
            sweet: createdSweets[0]._id,
            name: createdSweets[0].name,
            price: createdSweets[0].price,
            quantity: 2,
            image: createdSweets[0].imageFromUrl
          },
          {
            sweet: createdSweets[1]._id,
            name: createdSweets[1].name,
            price: createdSweets[1].price,
            quantity: 1,
            image: createdSweets[1].imageFromUrl
          }
        ],
        totalAmount: 550, // 150*2 + 250*1
        totalItems: 3,
        status: 'Pending',
        shippingAddress: {
          fullName: 'Regular User',
          address: '123 Sweet Street',
          city: 'Mumbai',
          postalCode: '400001',
          phone: '9876543210'
        },
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        user: user._id,
        orderNumber: 'SS87654321',
        items: [
          {
            sweet: createdSweets[2]._id,
            name: createdSweets[2].name,
            price: createdSweets[2].price,
            quantity: 5,
            image: createdSweets[2].imageFromUrl
          }
        ],
        totalAmount: 400, // 80*5
        totalItems: 5,
        status: 'Delivered',
        shippingAddress: {
          fullName: 'Regular User',
          address: '123 Sweet Street',
          city: 'Mumbai',
          postalCode: '400001',
          phone: '9876543210'
        },
        estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        user: admin._id,
        orderNumber: 'SS11223344',
        items: [
          {
            sweet: createdSweets[3]._id,
            name: createdSweets[3].name,
            price: createdSweets[3].price,
            quantity: 10,
            image: createdSweets[3].imageFromUrl
          },
          {
            sweet: createdSweets[4]._id,
            name: createdSweets[4].name,
            price: createdSweets[4].price,
            quantity: 2,
            image: createdSweets[4].imageFromUrl
          }
        ],
        totalAmount: 690, // 45*10 + 120*2
        totalItems: 12,
        status: 'Processing',
        shippingAddress: {
          fullName: 'Admin User',
          address: '456 Admin Avenue',
          city: 'Delhi',
          postalCode: '110001',
          phone: '9123456789'
        },
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];

    await Order.insertMany(sampleOrders);
    console.log('📦 Created sample orders');

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@sweetshop.com / admin123');
    console.log('User: user@sweetshop.com / user123');
    console.log('\n📊 Sample data created:');
    console.log('- 8 sample sweets');
    console.log('- 3 sample orders (1 Pending, 1 Delivered, 1 Processing)');
    console.log('- Total revenue: ₹1640');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed script
connectDB().then(() => {
  seedData();
});