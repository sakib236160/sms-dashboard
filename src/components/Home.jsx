import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSms, FaDollarSign, FaUser } from "react-icons/fa";
import { fetchSMSInfo } from "../redux/slices/dashboardSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { smsCount, balance, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchSMSInfo());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Heading */}
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white p-6 md:p-10 shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin!</h2>
        <p className="text-lg">
          Here’s your latest account overview at a glance.
        </p>
      </div>

      {/* Loading/Error State */}
      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SMS Count */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <FaSms className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">SMS Count</h2>
            <p className="text-xl font-bold">{smsCount}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-xl font-bold">${balance}</p>
          </div>
        </div>

        {/* Logged In User */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <FaUser className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Logged In As</h2>
            <p className="text-xl font-bold">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
