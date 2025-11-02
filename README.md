# 🍬 Sweet Shop - Complete E-commerce Platform

<div align="center">

![Sweet Shop Logo](https://img.shields.io/badge/Sweet%20Shop-E--commerce-ff69b4?style=for-the-badge&logo=shopify&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**A modern, full-stack e-commerce platform for sweet shops with advanced features like real-time notifications, order tracking, coupon management, and comprehensive admin dashboard.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [�️ Tecph Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [📡 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Features

### 🛍️ Customer Features
- **User Authentication** - Secure registration and login system
- **Product Catalog** - Browse extensive sweet collection with search and filters
- **Shopping Cart** - Add/remove items with real-time price calculation
- **Order Management** - Place orders and track delivery status
- **User Profile** - Manage personal information and order history
- **Reviews & Ratings** - Rate and review purchased products
- **Responsive Design** - Seamless experience across all devices

### 👨‍💼 Admin Features
- **Dashboard Analytics** - Sales overview, revenue tracking, and key metrics
- **Inventory Management** - Add, edit, delete products with stock tracking
- **Order Management** - Process orders, update status, and manage deliveries
- **User Management** - View and manage customer accounts
- **Coupon System** - Create and manage discount codes
- **Low Stock Alerts** - Automated notifications for inventory management
- **Sales Reports** - Detailed analytics and reporting tools

### 🔧 Technical Features
- **Real-time Notifications** - Push notifications for order updates
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Different permissions for users and admins
- **RESTful API** - Well-structured API endpoints
- **Data Validation** - Comprehensive input validation
- **Error Handling** - Graceful error management
- **Responsive UI** - Mobile-first design approach
- **SEO Optimized** - Search engine friendly structure

## �️ Teceh Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Library |
| **Vite** | 4.4.5 | Build Tool & Dev Server |
| **React Router** | 6.15.0 | Client-side Routing |
| **Axios** | 1.5.0 | HTTP Client |
| **Tailwind CSS** | 3.3.3 | Styling Framework |
| **React Hot Toast** | 2.4.1 | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 4.18.2 | Web Framework |
| **MongoDB** | 7.5.0 | Database |
| **Mongoose** | 7.5.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **bcryptjs** | 2.4.3 | Password Hashing |
| **Multer** | 1.4.5 | File Upload |
| **Validator** | 13.11.0 | Data Validation |

### Development & Testing
| Technology | Purpose |
|------------|---------|
| **Jest** | Testing Framework |
| **ESLint** | Code Linting |
| **Nodemon** | Development Server |
| **PostCSS** | CSS Processing |
| **Autoprefixer** | CSS Vendor Prefixes |

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        A[User Interface]
        B[React Router]
        C[Context API]
        D[Axios HTTP Client]
    end
    
    subgraph "Backend (Node.js + Express)"
        E[Express Server]
        F[Authentication Middleware]
        G[API Routes]
        H[Controllers]
    end
    
    subgraph "Database"
        I[MongoDB]
        J[User Collection]
        K[Sweet Collection]
        L[Order Collection]
        M[Review Collection]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    I --> K
    I --> L
    I --> M
```scription | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| `GET` | `/notifications` | Get user notifications | Yes | No |
| `POST` | `/notifications` | Create notification | Yes | Yes |
| `PUT` | `/notifications/:id/read` | Mark as read | Yes | No |
| `DELETE` | `/notifications/:id` | Delete notification | Yes | No |

### Request/Response Examples

<details>
<summary><strong>Authentication Examples</strong></summary>

**Register User:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@examp
