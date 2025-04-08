
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Brain, Play, Code, CheckCircle2, XCircle, AlertCircle, RefreshCw, Link } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AITestExecution = () => {
  const [testUrl, setTestUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<null | {
    status: 'success' | 'error' | 'warning';
    elements: number;
    screenshot: string;
    logs: string[];
    performanceMetrics: {
      loadTime: string;
      firstContentfulPaint: string;
      largestContentfulPaint: string;
      domInteractive: string;
    };
  }>(null);
  
  const { toast } = useToast();

  const runTest = () => {
    if (!testUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to test",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    
    // Simulate API call to HuggingFace or other AI service
    setTimeout(() => {
      setIsRunning(false);
      
      // Mock response data
      setResults({
        status: 'success',
        elements: 42,
        screenshot: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%2394a3b8'%3EWebsite Screenshot%3C/text%3E%3C/svg%3E",
        logs: [
          "Loading URL: " + testUrl,
          "Page loaded successfully",
          "Found 42 interactive elements",
          "All critical elements are accessible",
          "No console errors detected",
          "Performance metrics collected"
        ],
        performanceMetrics: {
          loadTime: "1.2s",
          firstContentfulPaint: "0.8s",
          largestContentfulPaint: "1.5s",
          domInteractive: "0.7s"
        }
      });
      
      toast({
        title: "Test completed",
        description: "AI test execution completed successfully",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-qa-blue" />
            AI Test Execution
          </CardTitle>
          <CardDescription>
            Execute AI-powered tests on any web application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center border rounded-md overflow-hidden bg-white">
              <Link className="h-4 w-4 mx-3 text-muted-foreground" />
              <input
                type="url"
                placeholder="Enter URL to test (e.g., https://example.com)"
                className="flex-1 py-3 px-2 focus:outline-none text-sm"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={runTest} 
              className="flex items-center gap-2"
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Test
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Test Results</span>
              <div className="flex items-center">
                {results.status === 'success' && <CheckCircle2 className="h-5 w-5 text-qa-success" />}
                {results.status === 'error' && <XCircle className="h-5 w-5 text-qa-error" />}
                {results.status === 'warning' && <AlertCircle className="h-5 w-5 text-qa-warning" />}
              </div>
            </CardTitle>
            <CardDescription>
              {testUrl}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Screenshot</h4>
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src={results.screenshot} 
                          alt="Website screenshot" 
                          className="w-full h-auto" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Elements Analysis</h4>
                      <div className="qa-code">
                        Found {results.elements} interactive elements
                        <br />
                        All critical elements are accessible
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Load Time</span>
                        <span className="font-medium">{results.performanceMetrics.loadTime}</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>First Contentful Paint</span>
                          <span>{results.performanceMetrics.firstContentfulPaint}</span>
                        </div>
                        <Progress value={80} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Largest Contentful Paint</span>
                          <span>{results.performanceMetrics.largestContentfulPaint}</span>
                        </div>
                        <Progress value={70} className="h-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>DOM Interactive</span>
                          <span>{results.performanceMetrics.domInteractive}</span>
                        </div>
                        <Progress value={90} className="h-1" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Accessibility</h4>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-qa-success flex items-center justify-center text-white mr-3">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">WCAG Compliant</div>
                          <div className="text-sm text-muted-foreground">All critical tests passing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="logs" className="space-y-2">
                <div className="bg-slate-50 border rounded-md p-4 font-mono text-sm">
                  {results.logs.map((log, index) => (
                    <div key={index} className="py-1">
                      <span className="text-slate-500">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span> {log}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(results.performanceMetrics).map(([key, value]) => (
                    <Card key={key} className="overflow-hidden">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="text-2xl font-bold">{value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Performance Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm">
                      Overall performance is good. Consider optimizing the Largest Contentful Paint by preloading critical resources and optimizing image delivery.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-muted-foreground">Test executed at {new Date().toLocaleTimeString()}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export Results</Button>
              <Button size="sm" onClick={runTest}>Run Again</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AITestExecution;
