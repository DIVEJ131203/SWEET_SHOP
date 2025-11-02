# 📸 Application Screenshots

This document contains screenshots of the Sweet Shop Management System in action.

## Authentication Pages

### Login Page
![Login Page](./screenshots/login.png)
- Clean and modern login interface
- Email and password fields with validation
- Link to registration page
- Error message display for invalid credentials

### Registration Page
![Registration Page](./screenshots/register.png)
- User registration form with name, email, password
- Role selection (User/Admin)
- Form validation
- Link back to login page

## User Dashboard

### Main Dashboard View
![Dashboard](./screenshots/dashboard.png)
- Grid layout displaying all available sweets
- Search bar for filtering by name
- Category dropdown filter
- Sweet cards showing:
  - Sweet emoji icon
  - Name and category
  - Price and stock quantity
  - Purchase button (disabled when out of stock)

### Search Functionality
![Search](./screenshots/search.png)
- Real-time search filtering
- Case-insensitive name matching
- Results update as you type

### Category Filter
![Category Filter](./screenshots/category-filter.png)
- Dropdown with all sweet categories
- Filters sweets by selected category
- Can be combined with search

### Out of Stock
![Out of Stock](./screenshots/out-of-stock.png)
- Purchase button disabled when quantity is 0
- Red badge showing "Stock: 0"
- Visual indication of unavailability

## Admin Features

### Add Sweet Modal
![Add Sweet Modal](./screenshots/add-sweet.png)
- Form to create new sweet
- Fields:
  - Name (text input)
  - Category (dropdown)
  - Price (number input)
  - Quantity (number input)
  - Description (textarea)
  - Icon selector (emoji picker)
- Cancel and Add buttons

### Edit Sweet Modal
![Edit Sweet Modal](./screenshots/edit-sweet.png)
- Pre-filled form with existing sweet data
- All fields editable
- Quick restock section
- Update and Cancel buttons

### Admin Controls
![Admin Controls](./screenshots/admin-controls.png)
- Edit button (blue)
- Delete button (red)
- Only visible to admin users
- Confirmation dialog for delete action

### Restock Functionality
![Restock](./screenshots/restock.png)
- Quick restock input in edit modal
- Add quantity to existing stock
- Instant update

## Responsive Design

### Mobile View (320px)
![Mobile View](./screenshots/mobile.png)
- Single column grid layout
- Stacked navigation
- Touch-friendly buttons
- Optimized for small screens

### Tablet View (768px)
![Tablet View](./screenshots/tablet.png)
- Two column grid layout
- Balanced spacing
- Comfortable touch targets

### Desktop View (1920px)
![Desktop View](./screenshots/desktop.png)
- Four column grid layout
- Maximum screen utilization
- Hover effects on cards

## User Experience

### Purchase Flow
![Purchase Flow](./screenshots/purchase-flow.png)
1. User clicks "Purchase" button
2. Quantity decreases by 1
3. Card updates in real-time
4. Button disables if quantity reaches 0

### Error Handling
![Error Messages](./screenshots/errors.png)
- Clear error messages
- Red alert boxes
- Specific error descriptions
- User-friendly language

### Loading States
![Loading](./screenshots/loading.png)
- Loading spinner during data fetch
- Disabled buttons during operations
- Smooth transitions

## Color Scheme

### Primary Colors
- Purple: `#9333EA` (buttons, headers)
- Pink: `#EC4899` (accents)
- Green: `#10B981` (success, in stock)
- Red: `#EF4444` (danger, out of stock)

### Gradients
- Background: Pink to Purple gradient
- Cards: White with subtle shadows

## Typography

- Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')
- Headings: Bold, larger sizes
- Body: Regular weight, readable sizes

## Icons & Emojis

Available sweet emojis:
🍬 🍭 🍫 🍩 🧁 🍰 🎂 🍪 🍮 🍯

## Accessibility Features

- High contrast text
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly labels
- ARIA attributes where needed

---

## How to Take Screenshots

To capture these screenshots for your project:

1. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd BACKEND
   npm run dev
   
   # Terminal 2 - Frontend
   cd FRONTEND/frontend
   npm run dev
   ```

2. **Create test data:**
   - Register an admin user
   - Add several sweets with different categories
   - Register a regular user

3. **Capture screenshots:**
   - Use browser dev tools to test responsive views
   - Take screenshots of each page/feature
   - Save in a `screenshots/` folder

4. **Recommended tools:**
   - Browser built-in screenshot (F12 → Device toolbar)
   - Lightshot (https://app.prntscr.com)
   - Snagit (https://www.techsmith.com/screen-capture.html)
   - macOS: Cmd+Shift+4
   - Windows: Win+Shift+S

5. **Screenshot naming convention:**
   - `login.png`
   - `register.png`
   - `dashboard.png`
   - `add-sweet.png`
   - `edit-sweet.png`
   - `mobile.png`
   - `tablet.png`
   - `desktop.png`

---

**Note:** Replace the placeholder image paths with actual screenshots once captured.

**Last Updated:** November 1, 2025
