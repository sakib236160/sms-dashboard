import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileBanner = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 p-8 rounded-2xl shadow-lg w-full max-w-6xl mx-auto mt-10"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Animated Profile Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <FaUserCircle className="text-blue-700 drop-shadow-lg" style={{ fontSize: '6rem' }} />
        </motion.div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back, <span className="text-blue-700">Admin!</span></h2>
          <p className="text-lg text-gray-600 mt-2">Here’s your latest account overview at a glance.</p>

          {/* User Info */}
          <div className="mt-5 space-y-1 text-gray-700 text-base">
            <p><span className="font-medium text-blue-600">Name:</span> Parvez</p>
            <p><span className="font-medium text-blue-600">Role:</span> Admin</p>
            <p><span className="font-medium text-blue-600">Last Login:</span> July 20, 2025</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileBanner;
