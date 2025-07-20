import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileBanner = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex items-center space-x-6">
        {/* Profile Icon with bounce animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <FaUserCircle className="text-blue-700" style={{ fontSize: '6rem' }} />
        </motion.div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back, Admin!</h2>
          <p className="text-lg text-gray-600 mt-1">
            Here’s your latest account overview at a glance.
          </p>

          {/* Optional User Info */}
          <div className="mt-4 text-gray-700 space-y-1">
            <p><strong>Name:</strong> Parvez</p>
            <p><strong>Role:</strong> Admin</p>
            <p><strong>Last Login:</strong> July 20, 2025</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileBanner;
