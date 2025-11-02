# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- MongoDB installed and running
- Git (optional)

## Installation & Setup

### Option 1: Install All Dependencies at Once
```bash
npm run install-all
```

### Option 2: Manual Installation

**Backend:**
```bash
cd BACKEND
npm install
```

**Frontend:**
```bash
cd FRONTEND/frontend
npm install
```

## Running the Application

### Start Both Servers (Recommended)
From the root directory:
```bash
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

### Start Servers Separately

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

## First Time Setup

1. Make sure MongoDB is running:
```bash
mongod
```

2. The backend will automatically create the database on first connection

3. Open http://localhost:3000 in your browser

4. Register a new account:
   - Choose "Admin" role to access all features
   - Choose "User" role for customer features only

## Testing the Application

### Create Your First Sweet (Admin Only)
1. Login as admin
2. Click "Add Sweet" button
3. Fill in the details:
   - Name: Chocolate Bar
   - Category: Chocolate
   - Price: 2.99
   - Quantity: 50
   - Description: Delicious milk chocolate
   - Icon: 🍫
4. Click "Add Sweet"

### Test User Features
1. Search for sweets by name
2. Filter by category
3. Click "Purchase" to buy a sweet (decreases quantity)

### Test Admin Features
1. Edit sweet details
2. Restock inventory
3. Delete sweets

## Running Tests

```bash
cd BACKEND
npm test
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check the connection string in `BACKEND/.env`

### Port Already in Use
- Backend: Change PORT in `BACKEND/.env`
- Frontend: Change port in `FRONTEND/frontend/vite.config.js`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules BACKEND/node_modules FRONTEND/frontend/node_modules
npm run install-all
```

## Default Test Accounts

Create these through the registration page:

**Admin Account:**
- Email: admin@sweetshop.com
- Password: admin123
- Role: Admin

**User Account:**
- Email: user@sweetshop.com
- Password: user123
- Role: User

## API Testing with Postman/Thunder Client

Import these endpoints:

**Base URL:** http://localhost:5000/api

**Register:**
```
POST /auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Login:**
```
POST /auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Sweets:**
```
GET /sweets
Headers: { "Authorization": "Bearer YOUR_TOKEN" }
```

## Next Steps

- Customize the sweet categories in the models
- Add more emoji options for sweet icons
- Implement user purchase history
- Add payment integration
- Deploy to production

## Need Help?

Check the main README.md for detailed documentation.
