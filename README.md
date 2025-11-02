# 🍬 Sweet Shop Management System

A full-stack MERN application for managing a sweet shop inventory with user authentication, role-based access control, and real-time inventory management.

## 📋 Project Overview

This Sweet Shop Management System allows users to browse and purchase sweets, while administrators can manage the inventory by adding, updating, and deleting products. The application features JWT-based authentication, search and filter capabilities, and a responsive design.

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Jest** & **Supertest** - Testing framework

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## ✨ Features

### User Features
- User registration and login
- Browse all available sweets
- Search sweets by name
- Filter sweets by category
- Purchase sweets (decreases inventory)
- View real-time stock availability

### Admin Features
- All user features
- Add new sweets to inventory
- Update sweet details (name, price, category, quantity, etc.)
- Delete sweets from inventory
- Restock sweets (increase quantity)
- Full CRUD operations on sweets

### Technical Features
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected API routes
- Responsive design
- Real-time inventory updates
- Input validation
- Error handling

## 📁 Project Structure

```
.
├── BACKEND/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── sweetController.js   # Sweet CRUD operations
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT verification & role check
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   └── Sweet.js             # Sweet schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── sweetRoutes.js       # Sweet endpoints
│   │   ├── tests/                   # Test files
│   │   └── server.js                # Express app entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
└── FRONTEND/
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── SweetCard.jsx           # Sweet display card
        │   │   ├── AddSweetModal.jsx       # Add sweet form
        │   │   └── EditSweetModal.jsx      # Edit sweet form
        │   ├── context/
        │   │   └── AuthContext.jsx         # Auth state management
        │   ├── pages/
        │   │   ├── Login.jsx               # Login page
        │   │   ├── Register.jsx            # Registration page
        │   │   └── Dashboard.jsx           # Main dashboard
        │   ├── services/
        │   │   └── api.js                  # Axios instance
        │   ├── App.jsx                     # Main app component
        │   ├── main.jsx                    # React entry point
        │   └── index.css                   # Global styles
        ├── index.html
        ├── vite.config.js
        ├── tailwind.config.js
        └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FRONTEND/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Running Both Servers

You can run both servers simultaneously in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd BACKEND
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd FRONTEND/frontend
npm run dev
```

## 🧪 Testing

### Backend Tests

```bash
cd BACKEND
npm test
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Sweets (All Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets (query params: name, category, minPrice, maxPrice)
- `POST /api/sweets` - Create sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet (decreases quantity)
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

### Request Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Sweet (Admin):**
```json
POST /api/sweets
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 50,
  "description": "Delicious milk chocolate",
  "image": "🍫"
}
```

## 👤 Default Users

You can create users through the registration page. To create an admin user, select "Admin" from the role dropdown during registration.

**Example Admin:**
- Email: admin@sweetshop.com
- Password: admin123
- Role: admin

**Example User:**
- Email: user@sweetshop.com
- Password: user123
- Role: user

## 🎨 Screenshots

### Login Page
Clean and simple authentication interface with email and password fields.

### Dashboard
- Search bar for finding sweets by name
- Category filter dropdown
- Grid layout displaying all sweets with images, prices, and stock levels
- Purchase buttons (disabled when out of stock)
- Admin controls (Add, Edit, Delete) visible only to admin users

### Admin Features
- Add Sweet Modal: Form to create new sweets with all details
- Edit Sweet Modal: Update existing sweets and quick restock functionality
- Delete confirmation dialogs

## 🔐 Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for stateless authentication
- Protected routes with middleware
- Role-based access control
- Input validation on both client and server
- CORS enabled for cross-origin requests

## 📝 My AI Usage

### Which AI tools I used
- **Kiro AI Assistant** - Used for generating boilerplate code, debugging, and code suggestions
- **GitHub Copilot** - Used for autocomplete and function implementations

### How I used them
- **Initial Setup**: Used Kiro to generate the initial project structure, including folder organization and basic configuration files
- **Model Schemas**: Asked Kiro to create the User and Sweet mongoose schemas with proper validation
- **Controller Logic**: Used Copilot to autocomplete CRUD operations in controllers
- **Frontend Components**: Generated React component boilerplate with Kiro, then manually customized the UI/UX
- **Authentication Flow**: Used AI to implement JWT token generation and verification logic
- **Testing**: Asked Kiro to generate test cases for API endpoints
- **Debugging**: When encountering errors, used Kiro to analyze error messages and suggest fixes
- **Styling**: Used Copilot for Tailwind CSS class suggestions to speed up styling

### Your reflection on how AI impacted your workflow
AI tools significantly accelerated the development process, particularly for repetitive tasks like creating CRUD operations and boilerplate code. The AI suggestions helped me focus more on business logic and user experience rather than syntax and structure. However, I found that AI-generated code sometimes needed refinement for edge cases and specific requirements. The most valuable aspect was using AI as a pair programming partner for debugging and exploring different implementation approaches. Overall, AI reduced development time by approximately 40% while maintaining code quality through manual review and testing.

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on your platform
2. Deploy the BACKEND directory
3. Ensure MongoDB connection string is configured

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL if needed

## 📄 License

MIT

## 👨‍💻 Author

[Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: This project was developed as part of a TDD Kata exercise focusing on full-stack development, testing, and modern development workflows.
