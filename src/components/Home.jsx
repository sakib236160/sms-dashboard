import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSms, FaDollarSign, FaUser } from 'react-icons/fa';
import SMSChart from './SMSChart';
import { fetchSMSInfo } from '../redux/slices/dashboardSlice';

const Home = () => {
  const dispatch = useDispatch();

  const { smsCount, balance, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSMSInfo());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SMS Count */}
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaSms className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">SMS Count</h2>
            <p className="text-xl">{smsCount}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-xl">${balance}</p>
          </div>
        </div>

        {/* Logged In User */}
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaUser className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Logged In As</h2>
            <p className="text-xl">Admin</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <SMSChart />
      </div>
    </div>
  );
};

export default Home;