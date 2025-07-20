import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../redux/slices/clientSlice";
import { motion, AnimatePresence } from "framer-motion";
import { ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FaUserCircle } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const ManageClient = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);

  const [showData, setShowData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
    const timer = setTimeout(() => setShowData(true), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);
  const paginatedClients = clients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      console.log("Delete client ID:", id);
      // dispatch(deleteClient(id));
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2 border-indigo-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage Clients
      </motion.h2>

      {loading || !showData ? (
        <motion.div
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ClockIcon className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
          <p className="text-lg text-gray-600 font-medium">
            Loading clients data...
          </p>
        </motion.div>
      ) : error ? (
        <motion.div
          className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg shadow-lg border border-red-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <XCircleIcon className="h-12 w-12 text-red-600 mb-4" />
          <p className="text-lg text-red-700 font-medium">
            Error loading data:
          </p>
          <p className="text-sm text-red-600">{error.message || error}</p>
          <button
            onClick={() => {
              setShowData(false);
              dispatch(fetchClients());
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </motion.div>
      ) : clients.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl font-medium">No clients found.</p>
          <p className="text-sm text-gray-500 mt-2">
            It seems there are no client accounts registered yet.
          </p>
        </motion.div>
      ) : (
        <>
          {/* Desktop Table */}
          <AnimatePresence>
            <motion.div
              className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedClients.map((client) => (
                    <motion.tr
                      key={client.id || client.username}
                      variants={itemVariants}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.id || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.organization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                        <FaUserCircle className="h-6 w-6 text-indigo-600" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-indigo-700 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>

          {/* Mobile Cards */}
          <AnimatePresence>
            <motion.div
              className="block md:hidden grid grid-cols-1 gap-4 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedClients.map((client) => (
                <motion.div
                  key={client.id || client.username}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md p-5 border"
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.username}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ID: {client.id || "N/A"}
                    </span>
                  </div>
                  <div className="text-gray-700 mb-2">
                    <span className="font-medium">Email:</span> {client.email}
                  </div>
                  <div className="text-gray-700 mb-2">
                    <span className="font-medium">Organization:</span>{" "}
                    {client.organization}
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black-10 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Edit Client Info
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={selectedClient.username}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedClient.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  defaultValue={selectedClient.organization}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageClient;
