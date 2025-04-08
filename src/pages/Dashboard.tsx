
import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';
import { Button } from '@/components/ui/button';
import { Plus, FilterX, Download } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <FilterX className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> New Test
          </Button>
        </div>
      </div>

      <DashboardMetrics />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Recent Test Executions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="p-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="py-2 border-b last:border-0 flex items-center justify-between">
                <div>
                  <div className="font-medium">Login Flow Test #{item}</div>
                  <div className="text-sm text-muted-foreground">Executed 2 hours ago</div>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  item % 3 === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  item % 2 === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {item % 3 === 0 ? 'Pending' : item % 2 === 0 ? 'Failed' : 'Passed'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Recent Requirements</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="p-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="py-2 border-b last:border-0">
                <div className="font-medium">User Authentication Requirement</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm text-muted-foreground">Updated 3 days ago</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">High Priority</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">Frontend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
