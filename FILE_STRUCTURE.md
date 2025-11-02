# 📁 Complete File Structure

## Project Overview

This document provides a complete overview of all files in the Sweet Shop Management System.

## Root Directory

```
sweetshop-management/
├── .gitignore                      # Git ignore rules
├── LICENSE                         # MIT License
├── package.json                    # Root package configuration
├── package-lock.json              # Root dependency lock
│
├── README.md                       # Main project documentation
├── GETTING_STARTED.md             # Quick start guide
├── QUICKSTART.md                  # Alternative quick start
├── API_DOCUMENTATION.md           # Complete API reference
├── TEST_REPORT.md                 # Testing results
├── DEPLOYMENT.md                  # Deployment instructions
├── CONTRIBUTING.md                # Contribution guidelines
├── SCREENSHOTS.md                 # UI documentation
├── PROJECT_SUMMARY.md             # Project overview
├── COMPLETION_CHECKLIST.md        # Project completion status
└── FILE_STRUCTURE.md              # This file
```

## Backend Structure

```
BACKEND/
├── .env                           # Environment variables
├── .env.test                      # Test environment variables
├── package.json                   # Backend dependencies
├── package-lock.json             # Backend dependency lock
│
└── src/
    ├── server.js                  # Express server entry point
    ├── jest.config.js            # Jest test configuration
    │
    ├── config/
    │   └── database.js           # MongoDB connection
    │
    ├── models/
    │   ├── User.js               # User schema & model
    │   └── Sweet.js              # Sweet schema & model
    │
    ├── controllers/
    │   ├── authController.js     # Authentication logic
    │   └── sweetController.js    # Sweet CRUD operations
    │
    ├── middleware/
    │   └── authMiddleware.js     # JWT & role verification
    │
    ├── routes/
    │   ├── authRoutes.js         # Auth endpoints
    │   └── sweetRoutes.js        # Sweet endpoints
    │
    └── tests/
        ├── auth.test.js          # Authentication tests
        └── sweets.test.js        # Sweet management tests
```

## Frontend Structure

```
FRONTEND/
└── frontend/
    ├── .gitignore                # Frontend git ignore
    ├── index.html                # HTML entry point
    ├── package.json              # Frontend dependencies
    ├── package-lock.json         # Frontend dependency lock
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind CSS config
    ├── postcss.config.js         # PostCSS config
    │
    ├── public/
    │   └── vite.svg              # Vite logo
    │
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Main app component
        ├── index.css             # Global styles
        │
        ├── components/
        │   ├── SweetCard.jsx     # Sweet display card
        │   ├── AddSweetModal.jsx # Add sweet form
        │   └── EditSweetModal.jsx # Edit sweet form
        │
        ├── context/
        │   └── AuthContext.jsx   # Auth state management
        │
        ├── pages/
        │   ├── Login.jsx         # Login page
        │   ├── Register.jsx      # Registration page
        │   └── Dashboard.jsx     # Main dashboard
        │
        └── services/
            └── api.js            # Axios API client
```

## File Descriptions

### Root Files

#### Configuration Files
- **package.json** - Root workspace configuration with scripts to run both servers
- **package-lock.json** - Locked versions of root dependencies
- **.gitignore** - Specifies files to ignore in git (node_modules, .env, etc.)
- **LICENSE** - MIT License for the project

#### Documentation Files
- **README.md** - Main project documentation with setup, features, and usage
- **GETTING_STARTED.md** - Step-by-step guide for first-time setup
- **QUICKSTART.md** - Quick reference for getting the app running
- **API_DOCUMENTATION.md** - Complete API endpoint reference with examples
- **TEST_REPORT.md** - Test results, coverage, and TDD methodology
- **DEPLOYMENT.md** - Instructions for deploying to various platforms
- **CONTRIBUTING.md** - Guidelines for contributing to the project
- **SCREENSHOTS.md** - UI documentation with screenshot placeholders
- **PROJECT_SUMMARY.md** - High-level project overview and statistics
- **COMPLETION_CHECKLIST.md** - Comprehensive checklist of completed features
- **FILE_STRUCTURE.md** - This file, documenting the project structure

### Backend Files

#### Configuration
- **BACKEND/.env** - Environment variables (PORT, MONGODB_URI, JWT_SECRET)
- **BACKEND/.env.test** - Test environment configuration
- **BACKEND/package.json** - Backend dependencies and scripts
- **BACKEND/src/jest.config.js** - Jest testing framework configuration

#### Core
- **BACKEND/src/server.js** - Express server setup, middleware, routes

#### Database
- **BACKEND/src/config/database.js** - MongoDB connection logic

#### Models (Mongoose Schemas)
- **BACKEND/src/models/User.js** - User schema with password hashing
- **BACKEND/src/models/Sweet.js** - Sweet schema with validation

#### Controllers (Business Logic)
- **BACKEND/src/controllers/authController.js** - Register, login, getMe
- **BACKEND/src/controllers/sweetController.js** - CRUD, purchase, restock, search

#### Middleware
- **BACKEND/src/middleware/authMiddleware.js** - JWT verification, admin check

#### Routes (API Endpoints)
- **BACKEND/src/routes/authRoutes.js** - Auth endpoint definitions
- **BACKEND/src/routes/sweetRoutes.js** - Sweet endpoint definitions

#### Tests
- **BACKEND/src/tests/auth.test.js** - Authentication endpoint tests
- **BACKEND/src/tests/sweets.test.js** - Sweet management tests

### Frontend Files

#### Configuration
- **FRONTEND/frontend/package.json** - Frontend dependencies (React, Vite, etc.)
- **FRONTEND/frontend/vite.config.js** - Vite build tool configuration
- **FRONTEND/frontend/tailwind.config.js** - Tailwind CSS configuration
- **FRONTEND/frontend/postcss.config.js** - PostCSS configuration
- **FRONTEND/frontend/.gitignore** - Frontend-specific git ignore rules

#### HTML
- **FRONTEND/frontend/index.html** - HTML entry point, loads React app

#### Core React
- **FRONTEND/frontend/src/main.jsx** - React app initialization
- **FRONTEND/frontend/src/App.jsx** - Main app with routing
- **FRONTEND/frontend/src/index.css** - Global CSS with Tailwind imports

#### Components
- **FRONTEND/frontend/src/components/SweetCard.jsx** - Displays sweet info and actions
- **FRONTEND/frontend/src/components/AddSweetModal.jsx** - Modal for adding sweets
- **FRONTEND/frontend/src/components/EditSweetModal.jsx** - Modal for editing sweets

#### Context (State Management)
- **FRONTEND/frontend/src/context/AuthContext.jsx** - Global auth state and functions

#### Pages
- **FRONTEND/frontend/src/pages/Login.jsx** - Login page with form
- **FRONTEND/frontend/src/pages/Register.jsx** - Registration page with form
- **FRONTEND/frontend/src/pages/Dashboard.jsx** - Main dashboard with sweets

#### Services
- **FRONTEND/frontend/src/services/api.js** - Axios instance for API calls

#### Assets
- **FRONTEND/frontend/public/vite.svg** - Vite logo

## File Statistics

### Total Files by Category

| Category | Count |
|----------|-------|
| Documentation | 11 |
| Backend Source | 11 |
| Backend Tests | 2 |
| Frontend Source | 11 |
| Configuration | 9 |
| Assets | 1 |
| **Total** | **45** |

### Lines of Code by Category

| Category | Lines |
|----------|-------|
| Backend Source | ~1,200 |
| Frontend Source | ~1,800 |
| Tests | ~400 |
| Documentation | ~3,500 |
| Configuration | ~200 |
| **Total** | **~7,100** |

## File Dependencies

### Backend Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3"
  },
  "devDependencies": {
    "@types/jest": "^29.5.11",
    "jest": "^29.7.0",
    "nodemon": "^3.0.2",
    "supertest": "^6.3.3"
  }
}
```

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "axios": "^1.6.5"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.11",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1"
  }
}
```

## Import/Export Flow

### Backend Flow
```
server.js
  ├── imports config/database.js
  ├── imports routes/authRoutes.js
  │   ├── imports controllers/authController.js
  │   │   └── imports models/User.js
  │   └── imports middleware/authMiddleware.js
  │       └── imports models/User.js
  └── imports routes/sweetRoutes.js
      ├── imports controllers/sweetController.js
      │   └── imports models/Sweet.js
      └── imports middleware/authMiddleware.js
```

### Frontend Flow
```
main.jsx
  └── imports App.jsx
      ├── imports context/AuthContext.jsx
      │   └── imports services/api.js
      ├── imports pages/Login.jsx
      │   └── imports context/AuthContext.jsx
      ├── imports pages/Register.jsx
      │   └── imports context/AuthContext.jsx
      └── imports pages/Dashboard.jsx
          ├── imports context/AuthContext.jsx
          ├── imports services/api.js
          ├── imports components/SweetCard.jsx
          ├── imports components/AddSweetModal.jsx
          │   └── imports services/api.js
          └── imports components/EditSweetModal.jsx
              └── imports services/api.js
```

## File Relationships

### Backend
- **Models** define database schemas
- **Controllers** use models for business logic
- **Routes** connect URLs to controllers
- **Middleware** protects routes and validates requests
- **Server** ties everything together

### Frontend
- **main.jsx** initializes React
- **App.jsx** sets up routing
- **Context** manages global state
- **Pages** are route components
- **Components** are reusable UI elements
- **Services** handle API communication

## Build Outputs (Not in Git)

### Backend
```
BACKEND/
├── node_modules/          # Dependencies (ignored)
└── coverage/              # Test coverage (ignored)
```

### Frontend
```
FRONTEND/frontend/
├── node_modules/          # Dependencies (ignored)
├── dist/                  # Production build (ignored)
└── .cache/                # Vite cache (ignored)
```

## Environment Files (Not in Git)

```
BACKEND/.env               # Local environment variables
BACKEND/.env.test          # Test environment variables
```

## Key File Interactions

### Authentication Flow
1. User submits login form (Login.jsx)
2. AuthContext calls api.js
3. api.js sends request to /api/auth/login
4. authRoutes.js routes to authController.js
5. authController.js validates with User.js model
6. JWT token returned to frontend
7. Token stored in localStorage
8. Token sent with all subsequent requests

### Sweet Purchase Flow
1. User clicks Purchase (SweetCard.jsx)
2. Dashboard.jsx calls api.js
3. api.js sends POST to /api/sweets/:id/purchase
4. sweetRoutes.js checks authMiddleware.js
5. sweetController.js updates Sweet.js model
6. Updated sweet returned to frontend
7. Dashboard.jsx refreshes sweet list

## Naming Conventions

### Files
- **Components:** PascalCase (SweetCard.jsx)
- **Pages:** PascalCase (Dashboard.jsx)
- **Utilities:** camelCase (api.js)
- **Config:** camelCase (database.js)
- **Tests:** camelCase with .test.js (auth.test.js)

### Folders
- **All lowercase:** components, pages, models, controllers
- **Descriptive:** Clear purpose from name

## File Size Estimates

| File | Approx. Lines |
|------|---------------|
| server.js | 50 |
| User.js | 40 |
| Sweet.js | 35 |
| authController.js | 90 |
| sweetController.js | 150 |
| authMiddleware.js | 45 |
| Dashboard.jsx | 180 |
| AuthContext.jsx | 70 |
| README.md | 500 |

## Conclusion

This file structure follows industry best practices:
- Clear separation of concerns
- Logical organization
- Scalable architecture
- Easy to navigate
- Well-documented

---

**Last Updated:** November 1, 2025
