# 📚 API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `400` - User already exists
- `500` - Server error

---

### Login
Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

---

### Get Current User
Get authenticated user's information.

**Endpoint:** `GET /auth/me`

**Access:** Protected

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T10:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Not authorized
- `500` - Server error

---

## Sweet Endpoints

### Get All Sweets
Retrieve all sweets in inventory.

**Endpoint:** `GET /sweets`

**Access:** Protected

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Chocolate Bar",
      "category": "Chocolate",
      "price": 2.99,
      "quantity": 50,
      "description": "Delicious milk chocolate",
      "image": "🍫",
      "createdAt": "2025-11-01T10:00:00.000Z",
      "updatedAt": "2025-11-01T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Gummy Bears",
      "category": "Gummies",
      "price": 1.99,
      "quantity": 100,
      "description": "Fruity gummy bears",
      "image": "🍬",
      "createdAt": "2025-11-01T10:00:00.000Z",
      "updatedAt": "2025-11-01T10:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Not authorized
- `500` - Server error

---

### Search Sweets
Search and filter sweets by various criteria.

**Endpoint:** `GET /sweets/search`

**Access:** Protected

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `name` (string, optional) - Search by name (case-insensitive)
- `category` (string, optional) - Filter by category
- `minPrice` (number, optional) - Minimum price
- `maxPrice` (number, optional) - Maximum price

**Example Request:**
```
GET /sweets/search?name=chocolate&minPrice=2&maxPrice=5
```

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Chocolate Bar",
      "category": "Chocolate",
      "price": 2.99,
      "quantity": 50,
      "description": "Delicious milk chocolate",
      "image": "🍫",
      "createdAt": "2025-11-01T10:00:00.000Z",
      "updatedAt": "2025-11-01T10:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Not authorized
- `500` - Server error

---

### Create Sweet
Add a new sweet to inventory (Admin only).

**Endpoint:** `POST /sweets`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 50,
  "description": "Delicious milk chocolate",
  "image": "🍫"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": 2.99,
    "quantity": 50,
    "description": "Delicious milk chocolate",
    "image": "🍫",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T10:00:00.000Z"
  }
}
```

**Validation Rules:**
- `name` - Required, string
- `category` - Required, must be one of: Chocolate, Gummies, Lollipops, Fudge, Hard Candy, Other
- `price` - Required, number, minimum 0
- `quantity` - Required, number, minimum 0
- `description` - Optional, string
- `image` - Optional, string (emoji)

**Errors:**
- `401` - Not authorized
- `403` - Access denied (not admin)
- `500` - Server error

---

### Update Sweet
Update sweet details (Admin only).

**Endpoint:** `PUT /sweets/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Sweet ID

**Request Body:**
```json
{
  "name": "Premium Chocolate Bar",
  "price": 3.99,
  "quantity": 75
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Chocolate Bar",
    "category": "Chocolate",
    "price": 3.99,
    "quantity": 75,
    "description": "Delicious milk chocolate",
    "image": "🍫",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T11:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Not authorized
- `403` - Access denied (not admin)
- `404` - Sweet not found
- `500` - Server error

---

### Delete Sweet
Remove sweet from inventory (Admin only).

**Endpoint:** `DELETE /sweets/:id`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Sweet ID

**Response (200):**
```json
{
  "success": true,
  "message": "Sweet deleted successfully"
}
```

**Errors:**
- `401` - Not authorized
- `403` - Access denied (not admin)
- `404` - Sweet not found
- `500` - Server error

---

### Purchase Sweet
Purchase a sweet (decreases quantity by 1).

**Endpoint:** `POST /sweets/:id/purchase`

**Access:** Protected

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Sweet ID

**Response (200):**
```json
{
  "success": true,
  "message": "Purchase successful",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": 2.99,
    "quantity": 49,
    "description": "Delicious milk chocolate",
    "image": "🍫",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T11:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Sweet out of stock
- `401` - Not authorized
- `404` - Sweet not found
- `500` - Server error

---

### Restock Sweet
Increase sweet quantity (Admin only).

**Endpoint:** `POST /sweets/:id/restock`

**Access:** Protected (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Sweet ID

**Request Body:**
```json
{
  "quantity": 25
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Restock successful",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": 2.99,
    "quantity": 75,
    "description": "Delicious milk chocolate",
    "image": "🍫",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T11:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Not authorized
- `403` - Access denied (not admin)
- `404` - Sweet not found
- `500` - Server error

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized for this action)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are limited to:
- **100 requests per 15 minutes** per IP address

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Sweet Model
```javascript
{
  _id: ObjectId,
  name: String,
  category: String (enum: ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Other']),
  price: Number (min: 0),
  quantity: Number (min: 0),
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Example Usage with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Sweets
```bash
curl -X GET http://localhost:5000/api/sweets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Sweet (Admin)
```bash
curl -X POST http://localhost:5000/api/sweets \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": 2.99,
    "quantity": 50,
    "description": "Delicious milk chocolate",
    "image": "🍫"
  }'
```

### Purchase Sweet
```bash
curl -X POST http://localhost:5000/api/sweets/507f1f77bcf86cd799439011/purchase \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Postman Collection

Import this collection into Postman for easy testing:

```json
{
  "info": {
    "name": "Sweet Shop API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\",\n  \"role\": \"user\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

---

**Last Updated:** November 1, 2025
