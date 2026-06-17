// ============================================
// MERN REST API - User Management System
// ============================================

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

// Import the User model
const User = require('./models/User');

// ============================================
// Initialize Express Application
// ============================================
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Middleware Configuration
// ============================================

// Enable CORS to allow requests from React frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// ============================================
// Database Connection
// ============================================

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  });

// ============================================
// REST API ROUTES
// ============================================

/**
 * GET /api/users
 * Description: Retrieve all users from the database
 * Response: Array of user objects
 */
app.get('/api/users', async (req, res) => {
  try {
    // Use Mongoose find() method to get all users
    // Sort by createdAt in descending order (newest first)
    const users = await User.find().sort({ createdAt: -1 });
    
    // Send success response with users data
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    // Send error response
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

/**
 * GET /api/users/:id
 * Description: Retrieve a single user by ID
 * Parameters: id (user ID)
 * Response: Single user object
 */
app.get('/api/users/:id', async (req, res) => {
  try {
    // Use Mongoose findById() method to get user by ID
    const user = await User.findById(req.params.id);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Send success response with user data
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    // Send error response
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

/**
 * POST /api/users
 * Description: Add a new user to the database
 * Body: User data (firstName, lastName, email, phone, age, city, country, jobTitle)
 * Response: Newly created user object
 */
app.post('/api/users', async (req, res) => {
  try {
    // Extract user data from request body
    const { firstName, lastName, email, phone, age, city, country, jobTitle } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide firstName, lastName, and email'
      });
    }
    
    // Create a new User document using the User model
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone: phone || '',
      age: age || null,
      city: city || '',
      country: country || '',
      jobTitle: jobTitle || ''
    });
    
    // Save the new user to MongoDB
    const savedUser = await newUser.save();
    
    // Send success response with created user data
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the database'
      });
    }
    
    // Send general error response
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

/**
 * PUT /api/users/:id
 * Description: Edit/Update a user by ID
 * Parameters: id (user ID)
 * Body: User data to update (firstName, lastName, email, phone, age, city, country, jobTitle)
 * Response: Updated user object
 */
app.put('/api/users/:id', async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const userId = req.params.id;
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    // Extract update data from request body
    const updateData = req.body;
    
    // Use Mongoose findByIdAndUpdate() to update user and return updated document
    // The { new: true } option returns the updated document instead of the original
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators on update
      }
    );
    
    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Send success response with updated user data
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the database'
      });
    }
    
    // Send general error response
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

/**
 * DELETE /api/users/:id
 * Description: Remove/Delete a user by ID
 * Parameters: id (user ID)
 * Response: Deleted user object
 */
app.delete('/api/users/:id', async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const userId = req.params.id;
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    // Use Mongoose findByIdAndDelete() to delete user and return deleted document
    const deletedUser = await User.findByIdAndDelete(userId);
    
    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Send success response with deleted user data
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    // Send error response
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

/**
 * Basic route to check if server is running
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running ✅'
  });
});

/**
 * 404 Route handler for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ============================================
// Start Express Server
// ============================================
app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║     🚀 MERN User API Server Started    ║
    ║     Server running on port: ${PORT}         ║
    ║     Env: ${NODE_ENV}              ║
    ╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
