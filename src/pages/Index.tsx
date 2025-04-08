
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardMetrics from '@/components/DashboardMetrics';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Brain, CheckSquare, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AIQE Dashboard</h1>
            <p className="text-muted-foreground max-w-3xl">
              Welcome to the AI-powered Quality Engineering Platform. Enhance your testing process with automated test execution, 
              requirement analysis, and AI-assisted test case generation.
            </p>
          </div>
          
          <div className="mb-10">
            <DashboardMetrics />
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-qa-blue" />
                    AI Test Execution
                  </CardTitle>
                  <CardDescription>
                    Run intelligent tests on any website using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Execute AI-powered tests on web applications to identify visual, functional, and accessibility issues without writing any code.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/ai-test-execution" className="flex items-center gap-2">
                      Try Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-qa-blue" />
                    Requirement Analysis
                  </CardTitle>
                  <CardDescription>
                    Analyze requirements for testability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Evaluate the quality of requirements, identify missing information, and get suggestions for improvement to enhance testability.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/requirements" className="flex items-center gap-2">
                      Analyze <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-qa-blue" />
                    Test Case Generation
                  </CardTitle>
                  <CardDescription>
                    Generate test cases from requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate comprehensive test cases from your requirements and user stories using AI, saving time and increasing coverage.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/requirements" className="flex items-center gap-2">
                      Generate <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="font-medium">Activity</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
              <div>
                {[
                  { message: 'Login Test Suite executed successfully', time: '2 hours ago', status: 'success' },
                  { message: 'New requirement analyzed', time: '3 hours ago', status: 'info' },
                  { message: 'Test cases generated for User Registration', time: '5 hours ago', status: 'info' },
                  { message: 'Shopping Cart test failed', time: '1 day ago', status: 'error' },
                  { message: 'New test automation created', time: '2 days ago', status: 'info' },
                ].map((activity, i) => (
                  <div key={i} className="px-4 py-3 border-b last:border-0 flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className={`w-2 h-2 rounded-full mr-3 ${
                          activity.status === 'success' ? 'bg-qa-success' : 
                          activity.status === 'error' ? 'bg-qa-error' : 'bg-qa-blue'
                        }`}
                      ></div>
                      <div className="text-sm">{activity.message}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-background border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          AIQE &copy; {new Date().getFullYear()} - AI-powered Quality Engineering Platform
        </div>
      </footer>
    </div>
  );
};

export default Index;
