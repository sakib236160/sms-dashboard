export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      {/* Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Weekly Sales</h3>
          <p className="text-3xl font-bold mb-1">$ 500,000</p>
          <p className="text-sm opacity-90">Increase by 30%</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
          <p className="text-3xl font-bold mb-1">$ 2,000,000</p>
          <p className="text-sm opacity-90">Increase by 20%</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Yearly Sales</h3>
          <p className="text-3xl font-bold mb-1">$ 20,000,000</p>
          <p className="text-sm opacity-90">Increase by 10%</p>
        </div>
      </div>

      {/* Chart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trends</h3>
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            {/* এখানে তুমি Chart লাইব্রেরি দিয়ে চার্ট লাগাতে পারো */}
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Activity</h3>
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Growth</h3>
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
