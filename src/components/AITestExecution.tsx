
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Brain, Globe, PlayCircle, RefreshCw, CheckCircle, XCircle, AlertTriangle, Eye, Image, Code } from 'lucide-react';

const AITestExecution = () => {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [testMode, setTestMode] = useState('visual');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("results");
  const { toast } = useToast();

  const runTest = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to test",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setTestResults(null);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 800);

    // Simulate test execution
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Mock response data
      const mockResults = {
        url: url,
        timestamp: new Date().toISOString(),
        mode: testMode,
        status: 'completed',
        summary: {
          critical: testMode === 'functional' ? 2 : 1,
          warnings: testMode === 'accessibility' ? 5 : 3,
          passed: testMode === 'visual' ? 12 : 8,
        },
        details: [
          {
            id: 'test-1',
            name: testMode === 'visual' ? 'Visual elements render correctly' : 
                  testMode === 'functional' ? 'Form submission works' : 'All images have alt text',
            status: 'passed',
            description: 'The test passed successfully',
            evidence: 'screenshot1.png'
          },
          {
            id: 'test-2',
            name: testMode === 'visual' ? 'Responsive design breakpoints' : 
                  testMode === 'functional' ? 'Navigation links work' : 'Color contrast is sufficient',
            status: testMode === 'accessibility' ? 'warning' : 'passed',
            description: testMode === 'accessibility' ? 'Some elements have contrast issues' : 'The test passed with high confidence',
            evidence: 'screenshot2.png'
          },
          {
            id: 'test-3',
            name: testMode === 'visual' ? 'Color scheme consistency' : 
                  testMode === 'functional' ? 'Login functionality' : 'Keyboard navigation',
            status: testMode === 'functional' ? 'failed' : 'warning',
            description: testMode === 'functional' ? 'Login form submission failed' : 'Minor issues detected',
            evidence: 'screenshot3.png'
          }
        ],
        browserLog: [
          { level: 'info', message: 'Page loaded successfully' },
          { level: 'info', message: `Running ${testMode} tests...` },
          { level: testMode === 'functional' ? 'error' : 'warning', message: testMode === 'functional' ? 'Failed to submit form' : 'Minor layout issue detected' }
        ],
        // Browser-use simulation data
        browserCapture: {
          screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
          actions: [
            { type: 'navigate', target: url, timestamp: Date.now() - 5000 },
            { type: 'click', selector: 'button', timestamp: Date.now() - 3000 },
            { type: 'type', selector: 'input', value: 'test input', timestamp: Date.now() - 2000 },
            { type: 'scroll', position: { x: 0, y: 500 }, timestamp: Date.now() - 1000 }
          ],
          elements: {
            detected: 32,
            interactive: 12,
            issues: testMode === 'accessibility' ? 5 : (testMode === 'functional' ? 2 : 1)
          }
        }
      };
      
      setTestResults(mockResults);
      setIsRunning(false);
      setActiveTab("results");
      
      toast({
        title: "Test Completed",
        description: `AI ${testMode} test completed successfully`,
      });
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-qa-blue" />
            AI Test Execution
          </CardTitle>
          <CardDescription>
            Use AI agents to automatically test web applications without writing code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex mt-1.5 gap-2">
                <div className="relative flex-grow">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="url"
                    placeholder="https://example.com" 
                    className="pl-9"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isRunning}
                  />
                </div>
                <Button 
                  onClick={runTest} 
                  disabled={isRunning || !url}
                  className="flex items-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Run Test
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="test-mode">Test Mode</Label>
              <Select 
                disabled={isRunning} 
                value={testMode} 
                onValueChange={setTestMode}
              >
                <SelectTrigger id="test-mode" className="w-full mt-1.5">
                  <SelectValue placeholder="Select test mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual Testing</SelectItem>
                  <SelectItem value="functional">Functional Testing</SelectItem>
                  <SelectItem value="accessibility">Accessibility Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">Test Instructions (Optional)</Label>
            <Textarea 
              id="prompt"
              placeholder="Describe specific test scenarios or provide instructions for the AI (e.g., 'Test the login form with invalid credentials')"
              className="min-h-[80px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Running tests...</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
      
      {testResults && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  {new Date(testResults.timestamp).toLocaleString()} • {testResults.url}
                </CardDescription>
              </div>
              <div className="flex gap-2 items-center">
                {testResults.summary.critical > 0 ? (
                  <div className="flex items-center text-xs text-qa-error">
                    <XCircle className="h-4 w-4 mr-1" /> {testResults.summary.critical} Critical
                  </div>
                ) : null}
                {testResults.summary.warnings > 0 ? (
                  <div className="flex items-center text-xs text-qa-warning ml-2">
                    <AlertTriangle className="h-4 w-4 mr-1" /> {testResults.summary.warnings} Warnings
                  </div>
                ) : null}
                <div className="flex items-center text-xs text-qa-success ml-2">
                  <CheckCircle className="h-4 w-4 mr-1" /> {testResults.summary.passed} Passed
                </div>
              </div>
            </div>
            <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab} className="mt-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="browser">Browser Interaction</TabsTrigger>
                <TabsTrigger value="logs">Console Logs</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="results" className="space-y-4">
              {testResults.details.map((test) => (
                <div key={test.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      {test.status === 'passed' && (
                        <CheckCircle className="h-5 w-5 text-qa-success mt-0.5" />
                      )}
                      {test.status === 'warning' && (
                        <AlertTriangle className="h-5 w-5 text-qa-warning mt-0.5" />
                      )}
                      {test.status === 'failed' && (
                        <XCircle className="h-5 w-5 text-qa-error mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium text-base">{test.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="browser" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">Browser Capture</h4>
                <div className="aspect-video bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <h4 className="font-medium mb-2 text-sm">Browser Actions</h4>
                <div className="space-y-2">
                  {testResults.browserCapture.actions.map((action, i) => (
                    <div key={i} className="text-xs flex items-center border-l-2 border-qa-blue pl-2 py-1">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded mr-2">{action.type}</span>
                      <span className="text-muted-foreground">
                        {action.selector && `${action.selector} `}
                        {action.value && `"${action.value}" `}
                        {action.position && `(${action.position.x}, ${action.position.y})`}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold">{testResults.browserCapture.elements.detected}</div>
                    <div className="text-xs text-muted-foreground">Elements Detected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{testResults.browserCapture.elements.interactive}</div>
                    <div className="text-xs text-muted-foreground">Interactive Elements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{testResults.browserCapture.elements.issues}</div>
                    <div className="text-xs text-muted-foreground">Issues Found</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="logs">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm">
                {testResults.browserLog.map((log, i) => (
                  <div 
                    key={i} 
                    className={`mb-1 ${
                      log.level === 'error' ? 'text-qa-error' : 
                      log.level === 'warning' ? 'text-qa-warning' : 
                      'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="opacity-60">[{log.level}]</span> {log.message}
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              {testMode === 'visual' ? 'Visual testing' : 
               testMode === 'functional' ? 'Functional testing' : 
               'Accessibility testing'} using AI browser agents
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Export Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AITestExecution;
