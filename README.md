# MERN User Management REST API

A full-stack application built with **MongoDB**, **Express**, **React**, and **Node.js** for managing users with a complete REST API and interactive web interface.

## 📋 Project Overview

This project demonstrates a complete CRUD (Create, Read, Update, Delete) REST API with:
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Frontend**: React with Axios for API communication
- **Database**: MongoDB (local or MongoDB Atlas)

## 🗂️ Project Structure

```
MERN-User-API/
├── backend/
│   ├── config/
│   │   └── .env                 # Environment variables
│   ├── models/
│   │   └── User.js              # Mongoose User schema and model
│   ├── server.js                # Express server with all routes
│   ├── package.json             # Backend dependencies
│   └── node_modules/            # Installed dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Header component
│   │   │   ├── Header.css
│   │   │   ├── UserForm.js      # Form component for add/edit
│   │   │   ├── UserForm.css
│   │   │   ├── UserList.js      # Component to display users
│   │   │   └── UserList.css
│   │   ├── App.js               # Main App component
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   ├── index.css
│   │   └── node_modules/        # Installed dependencies
│   └── package.json             # Frontend dependencies
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local) OR **MongoDB Atlas account** (cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation & Setup

#### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The dependencies will include:
# - express: Web framework
# - mongoose: MongoDB ODM
# - dotenv: Environment variables
# - cors: Cross-origin requests

# Configure environment variables
# Edit config/.env file and add your MongoDB connection string
```

#### 2. Configure MongoDB Connection

Edit `backend/config/.env`:

**Option A: Using MongoDB Locally**
```env
MONGODB_URI=mongodb://localhost:27017/mern-user-api
```

**Option B: Using MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-user-api
```

#### 3. Start Backend Server

```bash
# From backend directory
npm start

# Output should show:
# ╔════════════════════════════════════════╗
# ║     🚀 MERN User API Server Started    ║
# ║     Server running on port: 5000       ║
# ║     Env: development                   ║
# ╚════════════════════════════════════════╝
```

#### 4. Setup Frontend

In a **new terminal**, navigate to frontend:

```bash
cd frontend

# Install dependencies
npm install

# The dependencies will include:
# - react: UI library
# - axios: HTTP client
# - react-icons: Icon library

# Start React development server
npm start

# Browser will open at http://localhost:3000
```

## 📡 API Routes

The backend provides these REST API endpoints:

### GET /api/users
**Retrieve all users**
- **Response**: Array of user objects
- **Status**: 200 OK

### GET /api/users/:id
**Retrieve a single user by ID**
- **Parameters**: `id` (MongoDB ObjectId)
- **Response**: Single user object
- **Status**: 200 OK / 404 Not Found

### POST /api/users
**Create a new user**
- **Body**: 
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 000-0000",
  "age": 25,
  "city": "New York",
  "country": "United States",
  "jobTitle": "Software Engineer"
}
```
- **Response**: Created user object
- **Status**: 201 Created

### PUT /api/users/:id
**Update an existing user**
- **Parameters**: `id` (MongoDB ObjectId)
- **Body**: Partial or complete user data
- **Response**: Updated user object
- **Status**: 200 OK

### DELETE /api/users/:id
**Delete a user**
- **Parameters**: `id` (MongoDB ObjectId)
- **Response**: Deleted user object
- **Status**: 200 OK

## 🧪 Testing with Postman

### 1. Import API Collection

**Manual Setup:**

1. Open Postman
2. Create a new collection called "MERN User API"
3. Set base URL: `http://localhost:5000/api`

### 2. Test Each Route

#### GET - Retrieve All Users
```
Method: GET
URL: http://localhost:5000/api/users
```

#### POST - Create New User
```
Method: POST
URL: http://localhost:5000/api/users
Headers: 
  Content-Type: application/json
Body (JSON):
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1 (555) 111-2222",
  "age": 28,
  "city": "Los Angeles",
  "country": "United States",
  "jobTitle": "Product Manager"
}
```

#### GET - Retrieve Single User
```
Method: GET
URL: http://localhost:5000/api/users/{USER_ID}
```
(Replace {USER_ID} with actual MongoDB ObjectId from GET all users)

#### PUT - Update User
```
Method: PUT
URL: http://localhost:5000/api/users/{USER_ID}
Headers:
  Content-Type: application/json
Body (JSON):
{
  "firstName": "Jane",
  "jobTitle": "Senior Product Manager"
}
```

#### DELETE - Delete User
```
Method: DELETE
URL: http://localhost:5000/api/users/{USER_ID}
```

## 🎯 Using the React Frontend

### Features

1. **Add User**: Fill out the form on the left and click "Add User"
2. **View Users**: See all users as cards on the right
3. **Edit User**: Click "Edit" on any user card to modify their details
4. **Delete User**: Click "Delete" to remove a user (with confirmation)
5. **Validation**: Form validates required fields and email format
6. **Error Handling**: Displays error messages if something goes wrong
7. **Success Messages**: Confirms when operations complete

### Form Validation

- **First Name**: Required, minimum 2 characters
- **Last Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format (and unique)
- **Phone**: Optional
- **Age**: Optional, must be between 0-150
- **City**: Optional
- **Country**: Optional
- **Job Title**: Optional

## 🔧 Troubleshooting

### Backend won't connect to MongoDB
- **Local MongoDB**: Ensure MongoDB service is running
  ```bash
  # On Windows: Services > MongoDB Community Server (Start)
  # On Mac: brew services start mongodb-community
  # On Linux: sudo systemctl start mongod
  ```
- **MongoDB Atlas**: Check connection string in `.env` file
- **Firewall**: Ensure port 27017 (local) or Atlas IP whitelist

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS is enabled (should be by default)
- Check network tab in browser DevTools

### Port already in use
```bash
# Find process using port 5000
# Kill it and restart server
lsof -i :5000
kill -9 <PID>
```

### Duplicate email error
- Email addresses must be unique
- Use a different email address

## 📚 Key Concepts Used

### Backend
- **Express Middleware**: CORS, JSON parsing
- **Mongoose Schemas**: Data validation and modeling
- **Error Handling**: Try-catch blocks and custom error messages
- **RESTful Conventions**: Standard HTTP methods and status codes
- **Database Indexing**: Unique constraint on email field

### Frontend
- **React Hooks**: useState, useEffect for state management
- **Axios**: Promise-based HTTP requests
- **Form Handling**: Controlled components with validation
- **Conditional Rendering**: Show/hide elements based on state
- **Component Composition**: Reusable, modular components
- **CSS Grid**: Responsive user card layout

## 📝 Code Comments

Both backend and frontend code includes comprehensive comments explaining:
- What each function does
- How to use each API endpoint
- Why certain decisions were made
- How validation works

## 🚀 Deployment (Optional)

### Deploy Backend (Heroku)
```bash
# Install Heroku CLI
# Login: heroku login
# Create app: heroku create your-app-name
# Deploy: git push heroku main
```

### Deploy Frontend (Vercel/Netlify)
```bash
# Build: npm run build
# Deploy to Vercel: vercel
# Or Netlify: netlify deploy
```

## 📧 Environment Variables

Create a `.env` file in the backend/config folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mern-user-api

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Axios Documentation](https://axios-http.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Built as a comprehensive MERN stack learning project.

---

**Happy Coding! 🚀**

For issues or questions, please check the troubleshooting section or consult the documentation links above.
#   C h e c k p o i n t - R E S T - A P I  
 