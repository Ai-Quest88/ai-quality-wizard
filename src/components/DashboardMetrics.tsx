
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, Clock, ActivityIcon, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data for dashboard
const testCoverageData = [
  { name: 'Login Module', automated: 85, manual: 15 },
  { name: 'User Management', automated: 70, manual: 30 },
  { name: 'Reporting', automated: 60, manual: 40 },
  { name: 'Analytics', automated: 50, manual: 50 },
  { name: 'Admin Panel', automated: 90, manual: 10 },
];

// Mock execution metrics data
const executionData = {
  passing: 42,
  failing: 7,
  pending: 12,
  avgDuration: '4.2m',
  peakMemory: '324MB',
  parallelExecutions: 5
};

// Mock test efficiency data
const efficiencyData = {
  manualEffortPerTest: 30, // minutes
  automationEffortPerTest: 180, // minutes to create automated test
  manualQERate: 45, // dollars per hour
  automationQERate: 65, // dollars per hour
  testsExecuted: 250, // number of times tests have been executed
  totalTests: 103 // total number of tests
};

// Calculate savings for efficiency metrics
const calculateSavings = () => {
  // Convert minutes to hours for calculation
  const manualEffortInHours = (efficiencyData.manualEffortPerTest * efficiencyData.testsExecuted * efficiencyData.totalTests) / 60;
  const automationEffortInHours = (efficiencyData.automationEffortPerTest * efficiencyData.totalTests) / 60;
  
  // Calculate costs
  const manualCost = manualEffortInHours * efficiencyData.manualQERate;
  const automationCost = automationEffortInHours * efficiencyData.automationQERate;
  
  // Calculate savings
  const moneySaved = manualCost - automationCost;
  const timeSavedHours = manualEffortInHours - automationEffortInHours;
  
  return {
    moneySaved,
    timeSavedHours,
    manualCost,
    automationCost
  };
};

const savings = calculateSavings();

const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3">
      {/* Test Coverage Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            Automation Coverage 
            <span className="text-qa-success text-sm flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" /> +8%
            </span>
          </CardTitle>
          <CardDescription>Automated tests vs. manual tests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span>76% automated</span>
            <span className="text-xs text-muted-foreground">Target: 85%</span>
          </div>
          <Progress value={76} className="h-2" />
          
          <div className="h-[140px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={testCoverageData}
                layout="vertical"
                barGap={0}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="automated" stackId="a" fill="#0ea5e9" name="Automated" />
                <Bar dataKey="manual" stackId="a" fill="#94a3b8" name="Manual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Test Execution Metrics Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Test Execution Metrics</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div className="text-center p-2 rounded-md bg-muted/30">
              <CheckCircle2 className="h-5 w-5 mx-auto text-qa-success mb-1" />
              <div className="text-xl font-semibold">{executionData.passing}</div>
              <div className="text-xs text-muted-foreground">Passing</div>
            </div>
            <div className="text-center p-2 rounded-md bg-muted/30">
              <AlertTriangle className="h-5 w-5 mx-auto text-qa-error mb-1" />
              <div className="text-xl font-semibold">{executionData.failing}</div>
              <div className="text-xs text-muted-foreground">Failing</div>
            </div>
            <div className="text-center p-2 rounded-md bg-muted/30">
              <Clock className="h-5 w-5 mx-auto text-qa-blue mb-1" />
              <div className="text-xl font-semibold">{executionData.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Runtime Metrics</div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Avg. Duration</span>
              <span className="font-medium">{executionData.avgDuration}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Peak Memory</span>
              <span className="font-medium">{executionData.peakMemory}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Parallel Executions</span>
              <span className="font-medium">{executionData.parallelExecutions}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Test Efficiency Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Test Efficiency</CardTitle>
          <CardDescription>Time & cost savings analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="effort" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="effort">Effort Saved</TabsTrigger>
              <TabsTrigger value="money">Money Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="effort" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-qa-success flex items-center">
                    <ActivityIcon className="h-5 w-5 mr-2" />
                    {Math.round(savings.timeSavedHours).toLocaleString()} hours
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Total manual effort avoided
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Manual test time per execution</span>
                  <span className="font-medium">{efficiencyData.manualEffortPerTest} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Test executions performed</span>
                  <span className="font-medium">{efficiencyData.testsExecuted.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>One-time automation effort</span>
                  <span className="font-medium">{Math.round(savings.automationCost / efficiencyData.automationQERate).toLocaleString()} hours</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="money" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-qa-success flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    ${Math.round(savings.moneySaved).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Total cost savings
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Manual testing cost</span>
                  <span className="font-medium">${Math.round(savings.manualCost).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Automation development cost</span>
                  <span className="font-medium">${Math.round(savings.automationCost).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Return on investment</span>
                  <span className="font-medium">{Math.round((savings.moneySaved / savings.automationCost) * 100)}%</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
