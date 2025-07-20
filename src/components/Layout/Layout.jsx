// Layout.jsx
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHome, FaUser, FaLock, FaBars, FaShoppingCart, FaBell, FaAngleDown } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { clearToken, logout } from "../../redux/slices/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error("Logout API failed, but clearing token anyway:", error);
    }
    dispatch(clearToken());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col pt-4">
        <div className="px-4 mb-8">
          <h1 className="text-2xl font-bold text-indigo-700">SMS Dashboard</h1>
        </div>

        <nav className="flex-grow">
          <ul>
            {/* ------------- Dashboard ------------- */}
            <li className="mb-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-l-4 border-indigo-700 transition-colors"
              >
                <IoSpeedometerOutline className="text-xl" />
                Dashboard
              </Link>
            </li>
            {/* -----------Home--------- */}
            <li className="mb-2">
              <Link
                to="/home"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaHome className="text-lg" />
                Home
              </Link>
            </li>
            {/* ------------ Profile ------------- */}
            <li className="mb-2">
              <Link
                to="/profile"
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaUser className="text-lg" />
                  Profile
                </div>
                <FaAngleDown className="text-xs" />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-700">
            <FaBars className="text-xl cursor-pointer" />
            <h2 className="text-xl font-semibold">SMS Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <FaShoppingCart className="text-xl text-gray-600 hover:text-indigo-700 cursor-pointer" />
            <FaBell className="text-xl text-gray-600 hover:text-indigo-700 cursor-pointer" />

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-700 focus:outline-none"
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt="Admin Avatar"
                  className="w-8 h-8 rounded-full border-2 border-indigo-300"
                />
                <span className="font-medium">Admin</span>
                <FaAngleDown
                  className={`text-xs transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="text-sm" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaLock className="text-sm" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Outlet - render child routes here */}
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}