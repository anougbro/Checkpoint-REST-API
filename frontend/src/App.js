// React imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Header from './components/Header';

// Import styles
import './App.css';

/**
 * Main App Component
 * Manages the state and orchestrates the entire application
 * Handles CRUD operations for users
 */
const App = () => {
  // State variables
  const [users, setUsers] = useState([]); // Store all users
  const [loading, setLoading] = useState(false); // Loading state
  const [editingUser, setEditingUser] = useState(null); // Track which user is being edited
  const [error, setError] = useState(null); // Store error messages
  const [successMessage, setSuccessMessage] = useState(''); // Store success messages

  // Base API URL
  const API_URL = 'http://localhost:5000/api/users';

  /**
   * Fetch all users from the database
   * Called when component mounts and after CRUD operations
   */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Make GET request to fetch all users
      const response = await axios.get(API_URL);
      
      // Update state with fetched users
      setUsers(response.data.data);
    } catch (err) {
      // Handle errors
      setError('Error fetching users. Make sure the server is running on port 5000.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Hook: Fetch users when component mounts
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handle adding a new user
   * @param {Object} userData - The user data to add
   */
  const handleAddUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Make POST request to create new user
      const response = await axios.post(API_URL, userData);
      
      // Add new user to the users array
      setUsers([response.data.data, ...users]);
      
      // Show success message
      setSuccessMessage('User created successfully! ✅');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Handle errors
      const errorMessage = err.response?.data?.message || 'Error creating user';
      setError(errorMessage);
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle updating a user
   * @param {string} userId - The ID of the user to update
   * @param {Object} userData - The updated user data
   */
  const handleUpdateUser = async (userId, userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Make PUT request to update user
      const response = await axios.put(`${API_URL}/${userId}`, userData);
      
      // Update the user in the users array
      setUsers(users.map(user => 
        user._id === userId ? response.data.data : user
      ));
      
      // Reset editing state
      setEditingUser(null);
      
      // Show success message
      setSuccessMessage('User updated successfully! ✅');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Handle errors
      const errorMessage = err.response?.data?.message || 'Error updating user';
      setError(errorMessage);
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle deleting a user
   * @param {string} userId - The ID of the user to delete
   */
  const handleDeleteUser = async (userId) => {
    // Confirm deletion with user
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Make DELETE request to remove user
      await axios.delete(`${API_URL}/${userId}`);
      
      // Remove user from the users array
      setUsers(users.filter(user => user._id !== userId));
      
      // Show success message
      setSuccessMessage('User deleted successfully! ✅');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Handle errors
      const errorMessage = err.response?.data?.message || 'Error deleting user';
      setError(errorMessage);
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle editing a user
   * @param {Object} user - The user object to edit
   */
  const handleEditUser = (user) => {
    setEditingUser(user);
    setError(null); // Clear any previous errors
  };

  /**
   * Cancel editing and reset state
   */
  const handleCancelEdit = () => {
    setEditingUser(null);
    setError(null);
  };

  /**
   * Render the main application
   */
  return (
    <div className="app-container">
      {/* Header Component */}
      <Header />

      <main className="app-main">
        {/* Error Message Display */}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">❌</span>
            <span>{error}</span>
            <button 
              className="alert-close"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        {/* Success Message Display */}
        {successMessage && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        <div className="app-content">
          {/* User Form Component - For adding/editing users */}
          <section className="form-section">
            <UserForm 
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              editingUser={editingUser}
              onCancelEdit={handleCancelEdit}
              loading={loading}
            />
          </section>

          {/* User List Component - Display all users */}
          <section className="list-section">
            <UserList 
              users={users}
              onDeleteUser={handleDeleteUser}
              onEditUser={handleEditUser}
              loading={loading}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 MERN User Management API | Built with React, Express & MongoDB</p>
      </footer>
    </div>
  );
};

export default App;
