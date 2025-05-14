# Jewellery Product Management System

A full-stack MERN application for jewellery product management with authentication, CRUD operations, and advanced features.

## 🚀 Features

### Core Features
- **Authentication System**
  - Secure JWT-based authentication
  - Email & password login
  - Protected routes

- **Product Management**
  - Complete CRUD operations for jewellery products
  - Advanced form with multiple input types:
    - Text & Number inputs (Name, Price, Stock, Description)
    - Autocomplete for Category Selection
    - Date Picker for Manufacturing Date
    - Image Upload functionality
  - Form validation

### Optional Features
- Server-side pagination
- Search functionality
- Advanced sorting options
- MongoDB stored procedures

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind css
- Responsive design

### Backend
- Node.js
- Express.js
- JWT for authentication
- Multer for image uploads

### Database
- MongoDB
- Mongoose ODM

## 📋 Installation

### Prerequisites
- Node.js (v14.0.0 or later)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohammedJasim001/jewellery-management-system.git
   cd jewellery-management-system
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5005
   MONGODB_URI
   JWT_SECRET_KEY
   CLOUD_NAME 
   API_KEY
   API_SECRET
   
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend
   cd frontend
   npm run dev
   ```


## 🔍 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product



Project Link: 

---

Made with ❤️ by ATTS TECHNOLOGIES PRIVATE LIMITED