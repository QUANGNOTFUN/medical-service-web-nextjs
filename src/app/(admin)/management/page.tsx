import React from 'react';

export default function ManagementPage() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome to the admin management dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Movies" 
          value="125" 
          description="Total movies in the database" 
        />
        <DashboardCard 
          title="Active Users" 
          value="1,240" 
          description="Registered users on the platform" 
        />
        <DashboardCard 
          title="Bookings" 
          value="450" 
          description="Bookings in the last 30 days" 
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard card component for statistics
function DashboardCard({ 
  title, 
  value, 
  description 
}: { 
  title: string; 
  value: string; 
  description: string; 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </div>
  );
}