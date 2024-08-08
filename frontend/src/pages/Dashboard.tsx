import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, MessageSquare, UserCheck } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext';


const Dashboard: React.FC = () => {

  const { summary, members, topContributors, growthRate, engagementRate, loading, error } = useContext(DashboardContext);

  console.log( topContributors,loading, error)
  const formatDate = (dateString:String) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${year}/${month}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{`Date: ${formatDate(label)}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="md:p-4 space-y-4">
      <h1 className="text-5xl font-bold p-6">Hi, Welcome to Community Dashboard 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Members" value={summary?.totalMembers} icon={<Users className="h-4 w-4" />} />
        <MetricCard title="Total Messages" value={summary?.totalMessages} icon={<MessageSquare className="h-4 w-4" />} />
        <MetricCard title="Active Members" value={members?.activeMembersCount} icon={<UserCheck className="h-4 w-4" />} />
        <MetricCard title="Inactive Members" value={members?.inactiveMembersCount} icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="newMembers" stroke="#8884d8" name="New Members" />
                <Line yAxisId="right" type="monotone" dataKey="totalMembers" stroke="#82ca9d" name="Total Members" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="messages" fill="#8884d8" name="Messages" />
                {/* <Bar dataKey="activeUsers" fill="#82ca9d" name="Active Users" /> */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl">
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 sm:space-y-3 md:space-y-4">
          {topContributors.map((user, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-sm sm:text-base md:text-lg lg:text-xl"
            >
              <span>
                {index + 1}. {user.username}
              </span>
              <span className="text-gray-500 flex gap-1" >
                {user.messageCount} <span className={`text-gray-500 ${user.messageCount > 0 ? 'sm:block hidden' : ''}`}>messages</span>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;