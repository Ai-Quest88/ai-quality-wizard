
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

// Mock data for charts
const automationData = [
  { name: 'API', manual: 8, automated: 92 },
  { name: 'UI', manual: 22, automated: 78 },
  { name: 'E2E', manual: 15, automated: 85 },
  { name: 'Integration', manual: 20, automated: 80 },
  { name: 'Unit', manual: 5, automated: 95 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quality Metrics Dashboard</h1>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {/* Test Coverage Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center justify-between">
              Test Coverage 
              <span className="text-green-500 text-sm flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +5%
              </span>
            </CardTitle>
            <CardDescription>Overall test coverage metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span>83% covered</span>
              <span className="text-xs text-muted-foreground">Target: 90%</span>
            </div>
            <Progress value={83} className="h-2" />
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  API Coverage
                </span>
                <span>92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  UI Coverage
                </span>
                <span>78%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Business Logic
                </span>
                <span>86%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Automation Test Coverage Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Automation Coverage</CardTitle>
            <CardDescription>Tests automated vs. manual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={automationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Bar dataKey="automated" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="manual" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 pt-2 border-t flex justify-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Automated</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <span className="text-xs">Manual</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Execution Metrics Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Execution Metrics</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="text-center p-2 rounded-md bg-muted/30">
                <CheckCircle2 className="h-5 w-5 mx-auto text-green-500 mb-1" />
                <div className="text-xl font-semibold">42</div>
                <div className="text-xs text-muted-foreground">Passing</div>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/30">
                <AlertTriangle className="h-5 w-5 mx-auto text-red-500 mb-1" />
                <div className="text-xl font-semibold">7</div>
                <div className="text-xs text-muted-foreground">Failing</div>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/30">
                <Clock className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                <div className="text-xl font-semibold">12</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm font-medium mb-2">Runtime Metrics</div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Avg. Duration</span>
                <span className="font-medium">4.2m</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Peak Memory</span>
                <span className="font-medium">324MB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Parallel Executions</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
