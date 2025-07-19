import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSMSInfo } from "../redux/slices/dashboardSlice";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { smsCount, balance, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSMSInfo());
  }, [dispatch]);

  const pieData = [
    { name: "SMS Count", value: smsCount },
    { name: "Balance", value: balance }
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  const barData = [
    { name: 'SMS Count', value: smsCount },
    { name: 'Balance', value: balance }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-md font-semibold">SMS Count</h3>
          <p>{smsCount}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-md font-semibold">Balance</h3>
          <p>$ {balance}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-md font-semibold mb-2">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md p-4 rounded">
          <h3 className="text-md font-semibold mb-2">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
