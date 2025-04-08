
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Play, Code, FileJson, FileText, CheckCircle, AlertTriangle, XCircle, Search } from 'lucide-react';

const TestAutomationHub = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("test-suites");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRunTest = (testId: string) => {
    toast({
      title: "Test Started",
      description: `Test ${testId} is now running.`
    });
  };

  // Sample test suite data
  const testSuites = [
    {
      id: "ts-001",
      name: "User Authentication",
      tests: 12,
      lastRun: "2023-04-05",
      status: "success",
      coverage: 89
    },
    {
      id: "ts-002",
      name: "Shopping Cart",
      tests: 24,
      lastRun: "2023-04-03",
      status: "warning",
      coverage: 76
    },
    {
      id: "ts-003",
      name: "Payment Processing",
      tests: 18,
      lastRun: "2023-04-01",
      status: "error",
      coverage: 65
    },
    {
      id: "ts-004",
      name: "User Profile",
      tests: 8,
      lastRun: "2023-03-28",
      status: "success",
      coverage: 92
    },
    {
      id: "ts-005",
      name: "API Integration",
      tests: 32,
      lastRun: "2023-03-25",
      status: "success",
      coverage: 85
    }
  ];

  // Sample tests data
  const tests = [
    {
      id: "t-001",
      name: "Valid user login",
      suite: "User Authentication",
      lastRun: "2023-04-05",
      status: "success",
      duration: "1.2s"
    },
    {
      id: "t-002",
      name: "Invalid credentials",
      suite: "User Authentication",
      lastRun: "2023-04-05",
      status: "success",
      duration: "0.8s"
    },
    {
      id: "t-003",
      name: "Add product to cart",
      suite: "Shopping Cart",
      lastRun: "2023-04-03",
      status: "success",
      duration: "1.5s"
    },
    {
      id: "t-004",
      name: "Update cart quantity",
      suite: "Shopping Cart",
      lastRun: "2023-04-03",
      status: "warning",
      duration: "2.1s"
    },
    {
      id: "t-005",
      name: "Credit card payment",
      suite: "Payment Processing",
      lastRun: "2023-04-01",
      status: "error",
      duration: "3.2s"
    },
    {
      id: "t-006",
      name: "PayPal integration",
      suite: "Payment Processing",
      lastRun: "2023-04-01",
      status: "warning",
      duration: "4.5s"
    }
  ];

  const filteredTestSuites = testSuites.filter(suite => 
    suite.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTests = tests.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.suite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Test Automation Hub</h1>
        <Button className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Run Selected Tests
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tests or suites..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="test-suites" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="test-suites">Test Suites</TabsTrigger>
          <TabsTrigger value="tests">Individual Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="test-suites" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTestSuites.map(suite => (
              <Card key={suite.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{suite.name}</CardTitle>
                    <Badge 
                      variant={
                        suite.status === 'success' ? 'default' :
                        suite.status === 'warning' ? 'outline' : 'destructive'
                      }
                    >
                      {suite.status === 'success' ? 'Passing' : 
                       suite.status === 'warning' ? 'Warnings' : 'Failed'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {suite.tests} tests • Last run: {suite.lastRun}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Coverage</span>
                      <span className="font-medium">{suite.coverage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          suite.coverage > 80 ? 'bg-qa-success' : 
                          suite.coverage > 60 ? 'bg-qa-warning' : 'bg-qa-error'
                        }`}
                        style={{ width: `${suite.coverage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">View</Button>
                    <Button 
                      size="sm" 
                      className="flex-1 flex items-center gap-1"
                      onClick={() => handleRunTest(suite.id)}
                    >
                      <Play className="h-3.5 w-3.5" />
                      Run
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tests" className="mt-4">
          <div className="bg-card border rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b font-medium text-sm">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Suite</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Duration</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            {filteredTests.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No tests found matching your search criteria
              </div>
            )}
            
            {filteredTests.map(test => (
              <div key={test.id} className="grid grid-cols-12 gap-4 px-4 py-3 border-b last:border-0 items-center text-sm hover:bg-muted/50">
                <div className="col-span-5 font-medium">{test.name}</div>
                <div className="col-span-2">{test.suite}</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    {test.status === 'success' && (
                      <CheckCircle className="h-4 w-4 text-qa-success" />
                    )}
                    {test.status === 'warning' && (
                      <AlertTriangle className="h-4 w-4 text-qa-warning" />
                    )}
                    {test.status === 'error' && (
                      <XCircle className="h-4 w-4 text-qa-error" />
                    )}
                    <span>
                      {test.status === 'success' ? 'Passed' : 
                       test.status === 'warning' ? 'Warning' : 'Failed'}
                    </span>
                  </div>
                </div>
                <div className="col-span-1">{test.duration}</div>
                <div className="col-span-2 flex gap-2 justify-end">
                  <Button size="icon" variant="ghost" onClick={() => handleRunTest(test.id)}>
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Run test</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Code className="h-4 w-4" />
                    <span className="sr-only">View code</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View results</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestAutomationHub;
