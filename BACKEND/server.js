import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// Mock auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication
  if (email === 'admin@sweetshop.com' && password === 'admin123') {
    res.json({
      success: true,
      data: {
        token: 'mock-admin-token',
        user: {
          _id: '1',
          name: 'Admin User',
          email: 'admin@sweetshop.com',
          role: 'admin'
        }
      }
    });
  } else if (email === 'user@sweetshop.com' && password === 'user123') {
    res.json({
      success: true,
      data: {
        token: 'mock-user-token',
        user: {
          _id: '2',
          name: 'Regular User',
          email: 'user@sweetshop.com',
          role: 'user'
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  res.json({
    success: true,
    data: {
      token: 'mock-new-user-token',
      user: {
        _id: '3',
        name,
        email,
        role: role || 'user'
      }
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token === 'mock-admin-token') {
    res.json({
      success: true,
      data: {
        _id: '1',
        name: 'Admin User',
        email: 'admin@sweetshop.com',
        role: 'admin'
      }
    });
  } else if (token === 'mock-user-token') {
    res.json({
      success: true,
      data: {
        _id: '2',
        name: 'Regular User',
        email: 'user@sweetshop.com',
        role: 'user'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Mock sweets data
const mockSweets = [
  {
    _id: '1',
    name: 'Chocolate Truffle',
    description: 'Rich and creamy chocolate truffle',
    price: 150,
    category: 'Chocolate',
    emoji: '🍫',
    stock: 50,
    seller: { _id: '1', name: 'Admin User' },
    averageRating: 4.5,
    reviewCount: 12
  },
  {
    _id: '2',
    name: 'Strawberry Cake',
    description: 'Fresh strawberry cake with cream',
    price: 250,
    category: 'Cakes',
    emoji: '🍰',
    stock: 25,
    seller: { _id: '1', name: 'Admin User' },
    averageRating: 4.8,
    reviewCount: 8
  },
  {
    _id: '3',
    name: 'Vanilla Cookies',
    description: 'Crispy vanilla cookies',
    price: 80,
    category: 'Cookies',
    emoji: '🍪',
    stock: 100,
    seller: { _id: '1', name: 'Admin User' },
    averageRating: 4.2,
    reviewCount: 15
  }
];

// Sweets routes
app.get('/api/sweets', (req, res) => {
  res.json({
    success: true,
    count: mockSweets.length,
    data: mockSweets
  });
});

app.get('/api/sweets/search', (req, res) => {
  let filteredSweets = [...mockSweets];
  
  // Apply filters
  if (req.query.name) {
    filteredSweets = filteredSweets.filter(sweet => 
      sweet.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }
  
  if (req.query.category) {
    filteredSweets = filteredSweets.filter(sweet => 
      sweet.category === req.query.category
    );
  }
  
  res.json({
    success: true,
    count: filteredSweets.length,
    data: filteredSweets,
    pagination: {
      page: 1,
      pages: 1,
      total: filteredSweets.length,
      limit: 12
    }
  });
});

app.get('/api/sweets/my/products', (req, res) => {
  res.json({
    success: true,
    count: mockSweets.length,
    data: mockSweets
  });
});

app.get('/api/sweets/:id', (req, res) => {
  const sweet = mockSweets.find(s => s._id === req.params.id);
  if (sweet) {
    res.json({
      success: true,
      data: sweet
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Sweet not found'
    });
  }
});

app.post('/api/sweets', (req, res) => {
  const newSweet = {
    _id: String(mockSweets.length + 1),
    ...req.body,
    seller: { _id: '1', name: 'Admin User' },
    averageRating: 0,
    reviewCount: 0
  };
  
  mockSweets.push(newSweet);
  
  res.status(201).json({
    success: true,
    data: newSweet
  });
});

app.put('/api/sweets/:id', (req, res) => {
  const index = mockSweets.findIndex(s => s._id === req.params.id);
  if (index !== -1) {
    mockSweets[index] = { ...mockSweets[index], ...req.body };
    res.json({
      success: true,
      data: mockSweets[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Sweet not found'
    });
  }
});

app.delete('/api/sweets/:id', (req, res) => {
  const index = mockSweets.findIndex(s => s._id === req.params.id);
  if (index !== -1) {
    mockSweets.splice(index, 1);
    res.json({
      success: true,
      message: 'Sweet deleted successfully'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Sweet not found'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});