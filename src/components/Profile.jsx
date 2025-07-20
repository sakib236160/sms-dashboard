import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div
        className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-md"
        style={{ maxWidth: 400, width: '100%' }}
      >
        {/* User Icon with bounce animation */}
        <FaUserCircle
          className="text-gray-700 bounce"
          style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))' }}
        />

        <h2 className="mt-4 text-3xl font-bold text-gray-900">Profile Details</h2>

        {/* Static User Info */}
        <div className="mt-4 text-left text-gray-700 space-y-2 text-lg">
          <p><strong>Name:</strong> Parvez</p>
          <p><strong>Role:</strong> Admin</p>
          <p><strong>Last Login:</strong> 2025-07-20</p>
        </div>
      </div>

      {/* Custom CSS animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .bounce {
          animation: bounce 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Profile;
