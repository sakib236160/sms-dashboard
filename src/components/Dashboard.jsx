import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, clearToken } from '../redux/slices/authSlice'; 

import { FaHome, FaUser, FaLock, FaBars, FaShoppingCart, FaBell, FaAngleDown, FaChartBar } from 'react-icons/fa';
import { IoSpeedometerOutline } from "react-icons/io5"; 


export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
        } catch (error) {
            // If the logout API fails, still remove the token from the client side.
            console.error("Logout API failed, but clearing token anyway:", error);
        }
        dispatch(clearToken());
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col pt-4">
                {/* Logo/Brand Name */}
                <div className="px-4 mb-8">
                    <h1 className="text-2xl font-bold text-indigo-700">Business Center</h1>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-grow">
                    <ul>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-l-4 border-indigo-700 transition-colors"
                            >
                                <IoSpeedometerOutline className="text-xl" /> {/* Dashboard Icon */}
                                Dashboard
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <FaHome className="text-lg" />
                                Home
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-lg" />
                                    Profile
                                </div>
                                <FaAngleDown className="text-xs" />
                            </a>
                            {/* Profile Sub-menu - আপনি চাইলে এখানে একটি ড্রপডাউন যোগ করতে পারেন */}
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
                        <h2 className="text-xl font-semibold">Business Center</h2>
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
                                <FaAngleDown className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </button>

                            {/* Dropdown Menu Content */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaUser className="text-sm" /> Profile
                                    </a>
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

                {/* Main Dashboard Content */}
                <main className="flex-grow p-6 bg-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

                    {/* Sales Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Weekly Sales Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Weekly Sales</h3>
                            <p className="text-3xl font-bold mb-1">$ 500000</p>
                            <p className="text-sm opacity-90">Increase by 30%</p>
                        </div>
                        {/* Monthly Sales Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
                            <p className="text-3xl font-bold mb-1">$ 500000</p>
                            <p className="text-sm opacity-90">Increase by 20%</p>
                        </div>
                        {/* Yearly Sales Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Yearly Sales</h3>
                            <p className="text-3xl font-bold mb-1">$ 500000</p>
                            <p className="text-sm opacity-90">Increase by 10%</p>
                        </div>
                    </div>

                    {/* Chart Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Chart 1 */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trends</h3>
                            {/* Chart Placeholder - */}
                            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                Chart Placeholder
                            </div>
                        </div>
                        {/* Chart 2 */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Activity</h3>
                            {/* Chart Placeholder */}
                            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                Chart Placeholder
                            </div>
                        </div>
                        {/* Chart 3 */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Growth</h3>
                            {/* Chart Placeholder */}
                            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                Chart Placeholder
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}