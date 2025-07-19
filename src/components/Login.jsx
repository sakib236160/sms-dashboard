// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/slices/authSlice';  
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { motion } from 'framer-motion';
// import { FaUser, FaLock } from 'react-icons/fa';

// export default function GlassLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await dispatch(login({ username, password })).unwrap();
//       if (res.token) {
//         toast.success('Login successful!');
//         if (rememberMe) {
//           localStorage.setItem('rememberedUser', username);
//         } else {
//           localStorage.removeItem('rememberedUser');
//         }
//         navigate('/');  
//       } else {
//         toast.error('Login failed: No token received');
//       }
//     } catch (error) {
//       toast.error('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
//       <div className="relative">
//         <motion.div
//           className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1E293B] w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/20"
//           initial={{ scale: 0, y: 50 }}
//           animate={{ scale: 1, y: 0 }}
//           transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
//         >
//           <FaUser className="text-white/70 text-4xl" />
//         </motion.div>

//         <motion.div
//           className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <form onSubmit={handleSubmit} className="p-8 pt-20">
//             <div className="relative mb-5">
//               <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50" />
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full bg-[#1E293B]/80 text-white placeholder-white/50 pl-12 pr-4 py-3 rounded-md border-b-2 border-transparent focus:border-pink-400 focus:outline-none transition-all"
//                 required
//               />
//             </div>

//             <div className="relative mb-5">
//               <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#1E293B]/80 text-white placeholder-white/50 pl-12 pr-4 py-3 rounded-md border-b-2 border-transparent focus:border-pink-400 focus:outline-none transition-all"
//                 required
//               />
//             </div>

//             <div className="flex justify-between items-center text-sm text-white/80 mt-4 mb-8">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="form-checkbox h-4 w-4 bg-transparent text-pink-500 border-white/50 rounded focus:ring-pink-400"
//                 />
//                 <span className="ml-2">Remember me</span>
//               </label>
//               <a href="#" className="hover:text-white hover:underline">Forgot Password?</a>
//             </div>

//             <motion.button
//               type="submit"
//               className="w-[calc(100%+4rem)] -ml-8 bg-white/30 text-gray-800 font-bold uppercase tracking-widest py-4 rounded-b-3xl hover:bg-white/50 transition-colors duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Login
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    if (!username || !password) {
      toast.warning('Enter Username and Password');
      return;
    }

    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      toast.success('Login successful!');
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
