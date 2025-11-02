# 🍬 Sweet Shop - E-commerce Platform

<div align="center">

![Sweet Shop Logo](https://img.shields.io/badge/Sweet%20Shop-E--commerce-ff69b4?style=for-the-badge&logo=shopify&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

**A modern full-stack e-commerce platform for sweet shops with real-time notifications, order tracking, and admin dashb

**Developed b Divevej Ahuja*
[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)
>iv>

#icatotscation Sc

### 🏠 Homepage & Product Catalog
![Homepage](./screenshots/homepage.png)
*Browse through our extensive collectio swe sweets wiosearch ander optio

### 🛒Tehopping Ca(# & ech-kout
![Sh️ ArchiCart](.](#reenshots/cart.png)
*Seamless shopping experience with real-time cart updates*

### 👨‍💼 Admin Dashboard
![Admin Dashuoardatioscreenpi-docudmin-dashboard.png)
*Comprehensive admin panel for managing products, orders, and analytics*

### �  Mobile ResponsiontDesutn
![Mobile View](./screenshots/mobile-view.png)
*Fully resp desie design ectln as*perfecll 

# Mander Ma
![Order Management](./screenshots/order-management.png)
*Track and manage orders with real-time status updates*

## 🌟 Key Features

### 🛍️ For Custom - 
- **User Authentication** - Secure login/regichas system
- **ResductiCatalog** - Browse sweets with search and filters
- **Shopping Cart** - Real-time cart with price calculation
- **Or‍💼 ArackiFg** - Track delivery status in real-time
- **Reviews & Ratings** - Rate and review products
- **Responsive Design** - Works on all devices

### 👨‍💼 For Admins
- **DashboaSysAnalytics** - Sales overview anunmetrics
- **Inventock Aanagement** - Add, edit, delete products
- **Order Management** - Process and track orders
- **Coupon System** - Create discount codes
- **Low Stock Alerts** - Automated inventory notifications
- **User Management** - Manage customer accounts

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Testing:** Jest, ESLint  
**Deployment:** Vercel, MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone & Install**
   ```bash
   git httne https://github.com/yourusername/swe
   cd sweet-shop
   
   # Backend setup
   cd BACKEND && npm install
   
   # Frontend setup
   cd ../FRONTEND/frontend && npm install
   ```

2. **Environment Setup**
   
   **Backend `.env`:**
   ```env
   MONGODB_URI=monpose://lot:27017:27017/sweetshop
   JWT_SECRET=your_secret_key_here
| **JeNTEND_URL=http://localhk |
   ```
   
   **Fronten* | Cnv`:**
  **Autoprefixer** | CSS Vendor Prefixes |
  VITE_API_URL=http://localhost:5000
## ```

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

*A full-stack e-commerce platform built with modern web technologies*
- **Node.js**her) - [Dooad herettps://ejs.orgMongoDB**tallation or Atlas account) - [Get started](https://www.mongodb.com/)
- **Git** - [Download here](https://git-sc*npm** or **yarn** package manager

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://githum/yo/sweop.git
  sweet
   `

kend S
   ```bashcd BACKEND
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../FRONTEND/frontend
   npm in``# ⚙️ment Configuration

1.end Environriables**eate a `.e in the `BA direct``e
   ConfigurationORT=5000
  =development
   
base  MONGODB_URI=mo/localhost:27017/sweetshop
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/sweetshop
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
   
   # Frontend URL (f CORS)
   RL=http::5173
 . *end Ent Varles**
    Create v` file inND/frontend`

   # APConfigur VITAPI_URL=ocalhos
   ```

### 🚀 Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd BACKEND
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd FRONTEND/frontend
npm run dev
```

#### Option 2: Quick Start ipt (Reco```From the root directoryn d:al
### 🌱 Datase Seeding

Seed the database with sample data:
`bash
cd BACKEND
npm run seed
```

This will create:
- Sample sweet products
- Admin user (admin@sweetshop.com / admin123)
- Regular user (user@sweetshop.com / user123)
- Sample orders and reviews
ion

- *
### 🌐 Access the Applicat*Fron: http://loc3
- ckend API//localhost
- *ealth Check**: http://loca00/api/health

### 👤 Default Login Credentials

**Admin Account:**
- Email: `admin@sweetshop.com`
- Password: `admin123`

**User Account:**
- Email: `user@sweehop.com`
- Password: `23`onfiguraBackend Configuration

| Variable | Description | Default | Required |
|----------|-------------|----|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment | developme| No |
| `MONGODB_URI` | Database connection string | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | - | Yes |

### Frontend Configuration

| Variable | Descripti| Default quired |
|--------|---------|----------|_URL` | Backend API URL | - |

## ng

### Running Tests

**Backend Tests:**
```bash
cd BACKEND
npm test                    # Run all tests
npm run test:watch         # Run tests in watch moun test:co      # Run testh cove
```

*Tests:**
`
cd FRONTENDtend
npm test                    # Run component tests
npm runest:e2e   # Run end-to-end tests
est Cge

The prdes comprehensive test age for:

- ✅ **API Endpoints** - All CRUD operations
- ✅ **Autheion** - Login, reation, JWT validatiohorization** - Role-based access control
- ✅ **Data Va* - t lidation and sanitization
- ✅ **Error Handling** - Graceful error responses
- ✅ **Database Operations** - Model validations and queries
