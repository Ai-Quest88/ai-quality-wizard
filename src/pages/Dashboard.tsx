
import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Quality Engineering Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive overview of your quality engineering metrics</p>
      </div>
      
      <DashboardMetrics />
      
      <Tabs defaultValue="recent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Testing Activity</h2>
          <TabsList>
            <TabsTrigger value="recent">Recent Tests</TabsTrigger>
            <TabsTrigger value="failures">Failures</TabsTrigger>
            <TabsTrigger value="trends">Quality Trends</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Executions</CardTitle>
              <CardDescription>Latest test runs across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Login Functionality Test</div>
                    <div className="text-sm text-muted-foreground">Today at 10:30 AM • Visual testing</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">Passed</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Dashboard Accessibility</div>
                    <div className="text-sm text-muted-foreground">Yesterday at 4:15 PM • Accessibility testing</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Warnings (3)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Payment Flow Test</div>
                    <div className="text-sm text-muted-foreground">Yesterday at 2:45 PM • Functional testing</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">Failed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="failures">
          <Card>
            <CardHeader>
              <CardTitle>Recent Failures</CardTitle>
              <CardDescription>Tests that failed in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Payment Flow Test</div>
                    <div className="text-sm text-muted-foreground">Yesterday at 2:45 PM • Functional testing</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">Failed</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Registration Form</div>
                    <div className="text-sm text-muted-foreground">3 days ago • Functional testing</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">Failed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Quality Trends</CardTitle>
              <CardDescription>Testing trends over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Quality trends visualization will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
