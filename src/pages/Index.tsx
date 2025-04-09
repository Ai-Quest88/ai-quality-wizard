
import React from 'react';
import Navbar from '@/components/Navbar';
import QEAnimation from '@/components/QEAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Brain, CheckSquare, FileText, Star, Shield, Bot, Cpu, Gauge } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Hero Section with Animation */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-qa-blue to-accent">AIQE</span>
              <span className="ml-2">Platform</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
              The AI-powered Quality Engineering Platform. Enhance your testing process with automated test execution, 
              requirement analysis, and AI-assisted test case generation.
            </p>
            
            <QEAnimation />
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Star className="mr-2 h-5 w-5 text-qa-blue" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-qa-blue/50">
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
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-qa-blue/50">
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
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-qa-blue/50">
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
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-qa-blue" />
                Why Use AI for Testing?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1 w-4 h-4 rounded-full bg-qa-blue/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-qa-blue"></div>
                  </div>
                  <p>Reduce manual testing effort by up to 80% with intelligent test automation</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1 w-4 h-4 rounded-full bg-qa-blue/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-qa-blue"></div>
                  </div>
                  <p>Identify edge cases and scenarios human testers might miss</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1 w-4 h-4 rounded-full bg-qa-blue/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-qa-blue"></div>
                  </div>
                  <p>Continuously monitor applications for quality issues without manual intervention</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1 w-4 h-4 rounded-full bg-qa-blue/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-qa-blue"></div>
                  </div>
                  <p>Generate comprehensive test reports with actionable insights</p>
                </li>
              </ul>
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
