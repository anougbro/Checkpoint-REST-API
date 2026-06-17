// Import mongoose to create schemas and models
const mongoose = require('mongoose');

// Define the User Schema
// This schema defines the structure of each user document in MongoDB
const userSchema = new mongoose.Schema(
  {
    // User's first name - required string field
    firstName: {
      type: String,
      required: [true, 'Please provide a first name'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters']
    },
    
    // User's last name - required string field
    lastName: {
      type: String,
      required: [true, 'Please provide a last name'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters']
    },
    
    // User's email - required, unique, and validated
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    
    // User's phone number
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    
    // User's age
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age cannot be more than 150'],
      default: null
    },
    
    // User's city/location
    city: {
      type: String,
      trim: true,
      default: ''
    },
    
    // User's country
    country: {
      type: String,
      trim: true,
      default: ''
    },
    
    // User's job title
    jobTitle: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
  }
);

// Create and export the User model
// The model is used to interact with the users collection in MongoDB
module.exports = mongoose.model('User', userSchema);
