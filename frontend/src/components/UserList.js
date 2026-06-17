// React imports
import React from 'react';
import { FiEdit2, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase } from 'react-icons/fi';

// Import styles
import './UserList.css';

/**
 * UserList Component
 * Displays a list/table of all users with edit and delete options
 * @param {Array} users - Array of user objects
 * @param {Function} onDeleteUser - Callback function to delete user
 * @param {Function} onEditUser - Callback function to edit user
 * @param {Boolean} loading - Loading state
 */
const UserList = ({ users, onDeleteUser, onEditUser, loading }) => {
  return (
    <div className="user-list-container">
      <div className="list-header">
        <h2 className="list-title">👥 Users ({users.length})</h2>
        {users.length === 0 && (
          <p className="empty-state">No users yet. Add one to get started!</p>
        )}
      </div>

      {users.length > 0 ? (
        <div className="users-grid">
          {/* User Cards */}
          {users.map((user) => (
            <div key={user._id} className="user-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="user-avatar">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="user-basic-info">
                  <h3 className="user-name">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="user-email">
                    <FiMail /> {user.email}
                  </p>
                </div>
              </div>

              {/* Card Body - Additional Info */}
              <div className="card-body">
                {/* Phone */}
                {user.phone && (
                  <div className="info-item">
                    <FiPhone className="info-icon" />
                    <span>{user.phone}</span>
                  </div>
                )}

                {/* Age */}
                {user.age && (
                  <div className="info-item">
                    <span className="info-icon">🎂</span>
                    <span>{user.age} years old</span>
                  </div>
                )}

                {/* City */}
                {user.city && (
                  <div className="info-item">
                    <FiMapPin className="info-icon" />
                    <span>{user.city}</span>
                  </div>
                )}

                {/* Country */}
                {user.country && (
                  <div className="info-item">
                    <span className="info-icon">🌍</span>
                    <span>{user.country}</span>
                  </div>
                )}

                {/* Job Title */}
                {user.jobTitle && (
                  <div className="info-item">
                    <FiBriefcase className="info-icon" />
                    <span>{user.jobTitle}</span>
                  </div>
                )}

                {/* Created Date */}
                <div className="info-item date-info">
                  <span className="info-icon">📅</span>
                  <span>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Card Footer - Actions */}
              <div className="card-footer">
                <button
                  className="btn btn-edit"
                  onClick={() => onEditUser(user)}
                  disabled={loading}
                  title="Edit user"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDeleteUser(user._id)}
                  disabled={loading}
                  title="Delete user"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <div className="empty-icon">👤</div>
          <p className="empty-text">No users found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
