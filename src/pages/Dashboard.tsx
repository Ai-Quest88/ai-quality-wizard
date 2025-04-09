
import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Quality Engineering Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive overview of your quality engineering metrics</p>
      </div>
      
      <DashboardMetrics />
    </div>
  );
};

export default Dashboard;
