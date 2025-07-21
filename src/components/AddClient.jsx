import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddClient = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    organization: "",
    balance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://52.74.26.144:8008/client/apiClient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Client added successfully!");
        setFormData({
          username: "",
          email: "",
          organization: "",
          balance: "",
        });
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add client.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-white shadow-lg rounded-xl mt-10"
    >
      <div className="flex items-center space-x-3 mb-6">
        <FaUserPlus className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Add New Client</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Organization</label>
            <input
              type="text"
              name="organization"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Balance</label>
          <input
            type="number"
            name="balance"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Client
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddClient;
