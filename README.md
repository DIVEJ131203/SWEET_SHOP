# 🍬 Sweet Shop - E-commerce Platform

<div align="center">

![Sweet Shop Logo](https://img.shields.io/badge/Sweet%20Shop-E--commerce-ff69b4?style=for-the-badge&logo=shopify&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

**A modern full-stack e-commerce platform for sweet shops with real-time notifications, order tracking, and admin dashboard.**

**Developed by: Divej Ahuja**

</div>

## 📸 Application Screenshots

### 🏠 Homepage & Product Catalog
![Homepage](./screenshots/homepage.png)
*Browse through our extensive collection of sweets with search and filter options*

### 🛒 Shopping Cart & Checkout
![Shopping Cart](./screenshots/cart.png)
*Seamless shopping experience with real-time cart updates*

### 👨‍💼 Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)
*Comprehensive admin panel for managing products, orders, and analytics*

### 📱 Mobile Responsive Design
![Mobile View](./screenshots/mobile-view.png)
*Fully responsive design that works perfectly on all devices*

### 📊 Order Management
![Order Management](./screenshots/order-management.png)
*Track and manage orders with real-time status updates*

## 🌟 Key Features

### 🛍️ For Customers
- **User Authentication** - Secure login/register system
- **Product Catalog** - Browse sweets with search and filters
- **Shopping Cart** - Real-time cart with price calculation
- **Order Tracking** - Track delivery status in real-time
- **Reviews & Ratings** - Rate and review products
- **Responsive Design** - Works on all devices

### 👨‍💼 For Admins
- **Dashboard Analytics** - Sales overview and metrics
- **Inventory Management** - Add, edit, delete products
- **Order Management** - Process and track orders
- **Coupon System** - Create discount codes
- **Low Stock Alerts** - Automated inventory notifications
- **User Management** - Manage customer accounts

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Testing:** Jest, ESLint  
**Deployment:** Vercel, MongoDB Atlas

## 📁 Project Structure

```
sweet-shop/
├── BACKEND/                    # Node.js Express API
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   └── middleware/        # Auth & validation
│   └── server.js              # Entry point
│
├── FRONTEND/frontend/          # React Application
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # State management
│   │   └── utils/            # Helper functions
│   └── package.json
│
└── Documentation/             # Project docs
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/sweet-shop.git
   cd sweet-shop
   
   # Backend setup
   cd BACKEND && npm install
   
   # Frontend setup
   cd ../FRONTEND/frontend && npm install
   ```

2. **Environment Setup**
   
   **Backend `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your_secret_key_here
   FRONTEND_URL=http://localhost:5173
   ```
   
   **Frontend `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run Application**
   ```bash
   # Terminal 1 - Backend
   cd BACKEND && npm run dev
   
   # Terminal 2 - Frontend  
   cd FRONTEND/frontend && npm run dev
   ```

4. **Seed Database**
   ```bash
   cd BACKEND && npm run seed
   ```

### 🌐 Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### 👤 Test Credentials
- **Admin**: admin@sweetshop.com / admin123
- **User**: user@sweetshop.com / user123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/sweets` - Get all products
- `POST /api/sweets` - Create product (Admin)
- `PUT /api/sweets/:id` - Update product (Admin)
- `DELETE /api/sweets/:id` - Delete product (Admin)

### Orders & Cart
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart

## 🔐 Security Features
- JWT Authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS protection

## 🧪 Testing
```bash
# Backend tests
cd BACKEND && npm test

# Frontend tests
cd FRONTEND/frontend && npm test
```

## 🚀 Deployment

### Vercel Deployment
1. **Backend**: Deploy BACKEND folder to Vercel
2. **Frontend**: Deploy FRONTEND/frontend folder to Vercel
3. **Database**: Use MongoDB Atlas for production
4. **Environment Variables**: Set all required env vars in Vercel dashboard

## 📝 AI Usage Reflection

### Tools Used
- **Kiro AI Assistant** - Code generation, debugging, project structure
- **GitHub Copilot** - Autocomplete and function implementations

### Impact on Workflow
AI tools accelerated development by ~40%, particularly for:
- Boilerplate code generation
- CRUD operations
- Authentication flow implementation
- Debugging and error resolution
- Tailwind CSS styling

The AI suggestions helped focus more on business logic and user experience rather than syntax. Manual review and testing ensured code quality while AI handled repetitive tasks.

## 👨‍💻 Author

**Divej Ahuja**

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

*A full-stack e-commerce platform built with modern web technologies*

