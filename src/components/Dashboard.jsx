import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/slices/clientSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaDollarSign } from 'react-icons/fa';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
} from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);

  // local state to delay loading message show
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Handle delayed loading display
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setShowLoading(true), 1000); // 1 second delay
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const totalClients = clients?.length || 0;
  const totalBalance = clients?.reduce((sum, client) => sum + parseFloat(client.balance || 0), 0).toFixed(2);

  const chartData = clients
    ?.filter(client => client.balance)
    ?.sort((a, b) => b.balance - a.balance)
    ?.slice(0, 5)
    ?.map(client => ({
      name: client.username || 'Client',
      balance: parseFloat(client.balance || 0),
    }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

  const bounceAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="p-4 sm:p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-left"
      >
        Dashboard
      </motion.h2>
      <hr className="border-gray-300 py-2" />

      {/* Loading message with 1s delay and smooth fade */}
      <AnimatePresence>
        {showLoading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-yellow-500 text-center mb-4"
          >
            Loading clients...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-center mb-4"
        >
          Error: {error}
        </motion.p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <motion.div
          className="bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 rounded-xl shadow-md flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            variants={bounceAnimation}
            animate="animate"
            className="mb-4 text-blue-100"
          >
            <FaUsers size={48} />
          </motion.div>
          <h4 className="text-lg font-semibold mb-2">Total Clients</h4>
          <p className="text-3xl font-bold">{totalClients}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-300 to-green-500 text-white p-6 rounded-xl shadow-md flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            variants={bounceAnimation}
            animate="animate"
            className="mb-4 text-green-100"
          >
            <FaDollarSign size={48} />
          </motion.div>
          <h4 className="text-lg font-semibold mb-2">Total Balance</h4>
          <p className="text-3xl font-bold">${totalBalance}</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
      >
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h4 className="text-lg font-semibold mb-4 text-center">Top 5 Clients (Pie Chart)</h4>
          {chartData?.length > 0 ? (
            <div className="w-full h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    dataKey="balance"
                    label={({ name, balance }) => `${name}: $${balance}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available for chart.</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h4 className="text-lg font-semibold mb-4 text-center">Top 5 Clients (Bar Chart)</h4>
          {chartData?.length > 0 ? (
            <div className="w-full h-80">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="balance" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available for chart.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
