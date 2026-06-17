// React imports
import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase } from 'react-icons/fi';

// Import styles
import './UserForm.css';

/**
 * UserForm Component
 * Handles form submission for adding new users or editing existing ones
 * @param {Function} onAddUser - Callback function to add new user
 * @param {Function} onUpdateUser - Callback function to update existing user
 * @param {Object} editingUser - User object being edited (null if adding new)
 * @param {Function} onCancelEdit - Callback to cancel editing
 * @param {Boolean} loading - Loading state
 */
const UserForm = ({ 
  onAddUser, 
  onUpdateUser, 
  editingUser, 
  onCancelEdit, 
  loading 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    country: '',
    jobTitle: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Hook: Populate form when editing user
   */
  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName || '',
        lastName: editingUser.lastName || '',
        email: editingUser.email || '',
        phone: editingUser.phone || '',
        age: editingUser.age || '',
        city: editingUser.city || '',
        country: editingUser.country || '',
        jobTitle: editingUser.jobTitle || ''
      });
    }
  }, [editingUser]);

  /**
   * Validate form fields
   */
  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Email regex pattern
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    // Age validation (optional but if provided must be valid)
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
      newErrors.age = 'Age must be between 0 and 150';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handle field blur to mark as touched
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare data to send
    const dataToSubmit = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : null
    };

    // Call appropriate callback
    if (editingUser) {
      // Update existing user
      onUpdateUser(editingUser._id, dataToSubmit);
    } else {
      // Add new user
      onAddUser(dataToSubmit);
    }

    // Reset form
    resetForm();
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      city: '',
      country: '',
      jobTitle: ''
    });
    setErrors({});
    setTouched({});
  };

  /**
   * Handle cancel editing
   */
  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="user-form-container">
      <h2 className="form-title">
        {editingUser ? '✏️ Edit User' : '➕ Add New User'}
      </h2>

      <form onSubmit={handleSubmit} className="user-form">
        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            <FiUser className="field-icon" />
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John"
            className={`form-input ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
            disabled={loading}
          />
          {errors.firstName && touched.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            <FiUser className="field-icon" />
            Last Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Doe"
            className={`form-input ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
            disabled={loading}
          />
          {errors.lastName && touched.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <FiMail className="field-icon" />
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
            disabled={loading}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            <FiPhone className="field-icon" />
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 000-0000"
            className="form-input"
            disabled={loading}
          />
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            🎂 Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="25"
            min="0"
            max="150"
            className={`form-input ${errors.age && touched.age ? 'input-error' : ''}`}
            disabled={loading}
          />
          {errors.age && touched.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>

        {/* City Field */}
        <div className="form-group">
          <label htmlFor="city" className="form-label">
            <FiMapPin className="field-icon" />
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New York"
            className="form-input"
            disabled={loading}
          />
        </div>

        {/* Country Field */}
        <div className="form-group">
          <label htmlFor="country" className="form-label">
            🌍 Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="United States"
            className="form-input"
            disabled={loading}
          />
        </div>

        {/* Job Title Field */}
        <div className="form-group">
          <label htmlFor="jobTitle" className="form-label">
            <FiBriefcase className="field-icon" />
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Software Engineer"
            className="form-input"
            disabled={loading}
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : editingUser ? 'Update User' : 'Add User'}
          </button>

          {editingUser && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>

        {/* Form Help Text */}
        <p className="form-help">
          <span className="required">*</span> Required fields
        </p>
      </form>
    </div>
  );
};

export default UserForm;
