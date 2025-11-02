# 🚀 Getting Started - Sweet Shop Management System

Welcome! This guide will help you get the Sweet Shop Management System up and running in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

### Check Your Installations

```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
mongod --version  # Should show v5.x.x or higher
```

## Quick Start (5 Minutes)

### Step 1: Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm run install-all
```

This will install all dependencies for both backend and frontend.

### Step 2: Start MongoDB

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo mongod
```

Or if you have MongoDB as a service:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 3: Start the Application

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd BACKEND
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd FRONTEND/frontend
npm run dev
```

You should see:
```
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Sweet Shop login page! 🎉

## First Time Setup

### Create Your First Admin Account

1. Click "Register" on the login page
2. Fill in the form:
   - **Name:** Admin User
   - **Email:** admin@sweetshop.com
   - **Password:** admin123
   - **Role:** Select "Admin"
3. Click "Register"

You'll be automatically logged in and redirected to the dashboard.

### Add Your First Sweet

1. Click the "Add Sweet" button
2. Fill in the details:
   - **Name:** Chocolate Bar
   - **Category:** Chocolate
   - **Price:** 2.99
   - **Quantity:** 50
   - **Description:** Delicious milk chocolate
   - **Icon:** Click on 🍫
3. Click "Add Sweet"

Congratulations! You've added your first sweet! 🍫

### Test User Features

1. Logout (top right)
2. Register a new user account with role "User"
3. Login with the user account
4. Try searching for "Chocolate"
5. Click "Purchase" on a sweet
6. Watch the quantity decrease!

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error`

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   mongod
   ```
2. Check if port 27017 is available
3. Verify the connection string in `BACKEND/.env`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```
2. Or change the port in `BACKEND/.env`:
   ```env
   PORT=5001
   ```

### Frontend Not Loading

**Error:** Blank page or errors in console

**Solution:**
1. Clear browser cache
2. Check if backend is running on port 5000
3. Check browser console for errors
4. Restart the frontend dev server

### Dependencies Installation Failed

**Error:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules BACKEND/node_modules FRONTEND/frontend/node_modules

# Reinstall
npm run install-all
```

## Project Structure

```
sweetshop-management/
├── BACKEND/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── tests/          # Test files
│   │   └── server.js       # Entry point
│   ├── .env                # Environment variables
│   └── package.json
│
├── FRONTEND/
│   └── frontend/           # React frontend
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── context/    # State management
│       │   ├── pages/      # Page components
│       │   ├── services/   # API calls
│       │   ├── App.jsx     # Main app
│       │   └── main.jsx    # Entry point
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
└── Documentation files...
```

## Available Scripts

### Root Directory
```bash
npm run install-all      # Install all dependencies
npm run dev             # Start both servers
npm run dev:backend     # Start backend only
npm run dev:frontend    # Start frontend only
npm test                # Run backend tests
```

### Backend Directory
```bash
npm run dev             # Start with nodemon (auto-reload)
npm start               # Start production server
npm test                # Run tests
```

### Frontend Directory
```bash
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
```

### Frontend
No environment variables needed for local development. The API URL is configured in `vite.config.js` proxy.

## Testing the Application

### Run Automated Tests
```bash
cd BACKEND
npm test
```

Expected output:
```
PASS  src/tests/auth.test.js
PASS  src/tests/sweets.test.js

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

### Manual Testing Checklist

- [ ] Register a new user
- [ ] Login with credentials
- [ ] View dashboard with sweets
- [ ] Search for a sweet
- [ ] Filter by category
- [ ] Purchase a sweet
- [ ] Register as admin
- [ ] Add a new sweet
- [ ] Edit a sweet
- [ ] Delete a sweet
- [ ] Restock a sweet
- [ ] Logout

## Next Steps

### Learn More
- Read the [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions

### Customize
- Add more sweet categories in `BACKEND/src/models/Sweet.js`
- Change colors in `FRONTEND/frontend/tailwind.config.js`
- Add more emoji options in the modals

### Deploy
- Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to production
- Use Railway for backend
- Use Vercel for frontend
- Use MongoDB Atlas for database

## Common Tasks

### Add a New Sweet Category

1. Edit `BACKEND/src/models/Sweet.js`:
```javascript
category: {
  type: String,
  required: [true, 'Category is required'],
  enum: ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Cookies', 'Other']
  //                                                                  ^^^^^^^^^ Add here
}
```

2. Update frontend components to include the new category

### Change the Port

**Backend:**
Edit `BACKEND/.env`:
```env
PORT=8000
```

**Frontend:**
Edit `FRONTEND/frontend/vite.config.js`:
```javascript
server: {
  port: 4000,  // Change this
  // ...
}
```

### Reset the Database

```bash
# Connect to MongoDB
mongosh

# Switch to database
use sweetshop

# Drop collections
db.users.drop()
db.sweets.drop()

# Exit
exit
```

## Getting Help

### Documentation
- [README.md](README.md) - Main documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

### Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)

### Support
- Check existing issues in the repository
- Create a new issue with details
- Include error messages and logs

## Tips for Success

1. **Keep MongoDB Running:** The backend won't work without it
2. **Check Ports:** Make sure 5000 and 3000 are available
3. **Read Error Messages:** They usually tell you what's wrong
4. **Use Browser DevTools:** Check the Console and Network tabs
5. **Test as You Go:** Try features immediately after implementing

## Congratulations! 🎉

You now have a fully functional Sweet Shop Management System running locally. Enjoy exploring the features and customizing it to your needs!

---

**Need help?** Check the documentation files or create an issue in the repository.

**Ready to deploy?** See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

**Want to contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
