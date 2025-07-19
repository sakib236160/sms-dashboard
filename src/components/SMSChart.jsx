import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'July 17', sms: 30 },
  { name: 'July 18', sms: 50 },
  { name: 'July 19', sms: 80 },
];

const SMSChart = () => (
  <div className="bg-white p-4 rounded shadow mt-8">
    <h2 className="text-lg font-semibold mb-4">SMS Sent per Day</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sms" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default SMSChart;



