import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaHome,
  FaUser,
  FaLock,
  FaBars,
  FaShoppingCart,
  FaBell,
  FaAngleDown,
  FaUsers,
  FaUserPlus,
  FaUserCog,
} from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { clearToken, logout } from "../../redux/slices/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const navLinks = [
    {
      to: "/",
      label: "Dashboard",
      icon: <IoSpeedometerOutline className="text-xl" />,
    },
    { to: "/home", label: "Home", icon: <FaHome className="text-lg" /> },
    {
      to: "/addClient",
      label: "AddClient",
      icon: <FaUserPlus className="text-lg" />,
    },
    {
      to: "/manageClient",
      label: "ManageClient",
      icon: <FaUserCog className="text-lg" />,
    },
    {
      to: "/client",
      label: "ClientList",
      icon: <FaUsers className="text-lg" />,
    },
    { to: "/profile", label: "Profile", icon: <FaUser className="text-lg" /> },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg pt-4
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="px-4 mb-8">
              <h1 className="text-2xl font-bold text-indigo-700 select-none">
                SMS Dashboard
              </h1>
            </div>

            <nav className="flex flex-col space-y-1 px-2">
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                    ${
                      isActive(to)
                        ? "bg-indigo-100 text-indigo-700 font-semibold border-l-4 border-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {icon}
                  <span className="flex-grow">{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <footer className="p-4 border-t border-gray-200 text-center text-gray-600 text-sm select-none">
            © {new Date().getFullYear()} SMS Dashboard
          </footer>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen md:ml-64">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-4 text-gray-700">
            <FaBars
              className="text-xl cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <h2 className="text-xl font-semibold select-none">SMS Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <FaShoppingCart className="text-xl text-gray-600 hover:text-indigo-700 cursor-pointer" />
            <FaBell className="text-xl text-gray-600 hover:text-indigo-700 cursor-pointer" />

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-700 focus:outline-none select-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-controls="admin-menu"
              >
                <img
                  src="https://i.ibb.co/j9kBrJRb/profile-pic.jpg"
                  alt="Admin Avatar"
                  className="w-8 h-8 rounded-full border-2 border-indigo-300"
                />
                <span className="font-medium">Admin</span>
                <FaAngleDown
                  className={`text-xs transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
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
        <main className="flex-grow p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
