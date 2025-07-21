import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaBuilding, FaDollarSign, FaUser } from "react-icons/fa";
import { fetchClients } from "../redux/slices/clientSlice";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion"; 

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899"];

const Home = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const totalUsernames = clients?.length || 0;
  const totalEmails = clients?.filter((c) => c.email).length;
  const totalOrganizations = new Set(clients.map((c) => c.organization)).size;
  const totalBalance = clients
    ?.reduce((sum, c) => sum + parseFloat(c.balance || 0), 0)
    .toFixed(2);

  const chartData = [
    { name: "Username", value: totalUsernames },
    { name: "Email", value: totalEmails },
    { name: "Organization", value: totalOrganizations },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Dashboard Overview
      </motion.h1>
      <hr className="border-gray-300 py-2" />

      {/* Banner with animation */}
      <motion.div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white p-6 md:p-10 shadow-lg mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back, Admin!
        </motion.h2>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Here’s your latest account overview at a glance.
        </motion.p>
      </motion.div>

      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Cards with icon bounce */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card icon={<BouncingIcon><FaUser className="text-indigo-500 text-3xl" /></BouncingIcon>} title="Total User" count={totalUsernames} borderColor="indigo" />
        <Card icon={<BouncingIcon><FaEnvelope className="text-purple-500 text-3xl" /></BouncingIcon>} title="Total Email" count={totalEmails} borderColor="purple" />
        <Card icon={<BouncingIcon><FaBuilding className="text-pink-500 text-3xl" /></BouncingIcon>} title="Total Organization" count={totalOrganizations} borderColor="pink" />
        <Card icon={<BouncingIcon><FaDollarSign className="text-green-500 text-3xl" /></BouncingIcon>} title="Total Balance" count={`$${totalBalance}`} borderColor="green" />
      </div>

      {/* Charts with fade-up animation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <motion.div
          className="bg-white p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">User Distribution (Bar)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">User Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

// Bouncing icon component
const BouncingIcon = ({ children }) => (
  <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: 1,
    }}
  >
    {children}
  </motion.div>
);

// Card component
const Card = ({ icon, title, count, borderColor }) => {
  const borderClass = `hover:border-${borderColor}-500`;

  return (
    <motion.div
      className={`bg-white border-2 border-transparent ${borderClass} rounded-lg p-5 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 flex items-center gap-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </motion.div>
  );
};

export default Home;
