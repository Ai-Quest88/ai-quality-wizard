
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Clock, Play, Code, RefreshCw, Filter, Plus, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockTests = [
  {
    id: 'TA-001',
    name: 'Login Test Suite',
    status: 'passed',
    lastRun: '2 hours ago',
    duration: '45s',
    coverage: 78,
    type: 'UI',
    tests: 5,
    passing: 5,
  },
  {
    id: 'TA-002',
    name: 'User Registration',
    status: 'failed',
    lastRun: '1 day ago',
    duration: '32s',
    coverage: 65,
    type: 'UI',
    tests: 4,
    passing: 3,
  },
  {
    id: 'TA-003',
    name: 'Payment Processing',
    status: 'passed',
    lastRun: '3 hours ago',
    duration: '56s',
    coverage: 82,
    type: 'API',
    tests: 8,
    passing: 8,
  },
  {
    id: 'TA-004',
    name: 'Product Search',
    status: 'passed',
    lastRun: '5 hours ago',
    duration: '28s',
    coverage: 75,
    type: 'UI',
    tests: 6,
    passing: 6,
  },
  {
    id: 'TA-005',
    name: 'Shopping Cart',
    status: 'running',
    lastRun: 'Running...',
    duration: '—',
    coverage: 0,
    type: 'E2E',
    tests: 7,
    passing: 0,
  },
  {
    id: 'TA-006',
    name: 'Checkout Process',
    status: 'failed',
    lastRun: '12 hours ago',
    duration: '1m 12s',
    coverage: 68,
    type: 'E2E',
    tests: 10,
    passing: 8,
  },
  {
    id: 'TA-007',
    name: 'User Profile',
    status: 'waiting',
    lastRun: 'Never',
    duration: '—',
    coverage: 0,
    type: 'UI',
    tests: 3,
    passing: 0,
  }
];

const TestAutomationHub = () => {
  const [selectedTest, setSelectedTest] = useState<typeof mockTests[0] | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredTests = mockTests.filter(test =>
    test.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    test.id.toLowerCase().includes(searchValue.toLowerCase()) ||
    test.type.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelectTest = (test: typeof mockTests[0]) => {
    setSelectedTest(test);
  };

  const handleRunTest = () => {
    // Implementation would trigger test execution
    console.log("Running test:", selectedTest?.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Test Automation Hub</h1>
          <p className="text-muted-foreground">Manage and execute your automated test suites</p>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Test Suite
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Test Suites</CardTitle>
                <Badge variant="outline">{mockTests.length}</Badge>
              </div>
              <CardDescription>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <Input 
                    placeholder="Search tests..." 
                    className="max-w-[300px]"
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y">
                  {filteredTests.map((test) => (
                    <div
                      key={test.id}
                      className={`px-4 py-3 cursor-pointer hover:bg-slate-50 ${
                        selectedTest?.id === test.id ? 'bg-slate-50' : ''
                      }`}
                      onClick={() => handleSelectTest(test)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {test.status === 'passed' && <CheckCircle2 className="h-4 w-4 text-qa-success" />}
                          {test.status === 'failed' && <XCircle className="h-4 w-4 text-qa-error" />}
                          {test.status === 'running' && <RefreshCw className="h-4 w-4 text-qa-blue animate-spin" />}
                          {test.status === 'waiting' && <Clock className="h-4 w-4 text-muted-foreground" />}
                          <span className="font-medium">{test.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{test.type}</Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-4">
                        <div>ID: {test.id}</div>
                        <div>{test.lastRun}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedTest ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {selectedTest.status === 'passed' && <CheckCircle2 className="h-5 w-5 text-qa-success" />}
                    {selectedTest.status === 'failed' && <XCircle className="h-5 w-5 text-qa-error" />}
                    {selectedTest.status === 'running' && <RefreshCw className="h-5 w-5 text-qa-blue animate-spin" />}
                    {selectedTest.status === 'waiting' && <Clock className="h-5 w-5 text-muted-foreground" />}
                    {selectedTest.name}
                    <Badge variant="outline" className="ml-2">{selectedTest.id}</Badge>
                  </CardTitle>
                  <Button
                    disabled={selectedTest.status === 'running'}
                    className="flex items-center gap-1"
                    onClick={handleRunTest}
                  >
                    <Play className="h-4 w-4" />
                    Run Tests
                  </Button>
                </div>
                <CardDescription>
                  {selectedTest.type} test suite with {selectedTest.tests} test cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Status</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="flex items-center">
                            {selectedTest.status === 'passed' && 
                              <div className="flex items-center text-qa-success">
                                <CheckCircle2 className="h-5 w-5 mr-2" /> 
                                <span className="font-medium">Passing</span>
                              </div>
                            }
                            {selectedTest.status === 'failed' && 
                              <div className="flex items-center text-qa-error">
                                <XCircle className="h-5 w-5 mr-2" /> 
                                <span className="font-medium">Failing</span>
                              </div>
                            }
                            {selectedTest.status === 'running' && 
                              <div className="flex items-center text-qa-blue">
                                <RefreshCw className="h-5 w-5 mr-2 animate-spin" /> 
                                <span className="font-medium">Running</span>
                              </div>
                            }
                            {selectedTest.status === 'waiting' && 
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-5 w-5 mr-2" /> 
                                <span className="font-medium">Waiting</span>
                              </div>
                            }
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Duration</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="text-2xl font-medium">
                            {selectedTest.duration}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Last execution time
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">Coverage</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="flex items-center justify-between mb-1">
                            <span>{selectedTest.coverage}%</span>
                          </div>
                          <Progress value={selectedTest.coverage} className="h-2" />
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Test Results</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Success Rate</span>
                              <span className="text-sm">
                                {selectedTest.status === 'waiting' ? '—' : `${selectedTest.passing}/${selectedTest.tests}`}
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-2 bg-qa-success"
                                style={{ 
                                  width: selectedTest.status === 'waiting' ? '0%' : 
                                    `${(selectedTest.passing / selectedTest.tests) * 100}%`
                                }}
                              ></div>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-qa-success" />
                                <span className="text-sm">{selectedTest.passing} passing tests</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-qa-error" />
                                <span className="text-sm">
                                  {selectedTest.status === 'waiting' ? '—' : selectedTest.tests - selectedTest.passing} failing tests
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Recent Activity</div>
                            <div className="space-y-2">
                              <div className="text-xs flex justify-between py-1 border-b">
                                <span>Last run by</span>
                                <span className="font-medium">John Doe</span>
                              </div>
                              <div className="text-xs flex justify-between py-1 border-b">
                                <span>Modified</span>
                                <span className="font-medium">2 days ago</span>
                              </div>
                              <div className="text-xs flex justify-between py-1 border-b">
                                <span>Created</span>
                                <span className="font-medium">14 days ago</span>
                              </div>
                              <div className="text-xs flex justify-between py-1">
                                <span>Scheduled runs</span>
                                <span className="font-medium">Daily at 2:00 AM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="px-4 py-3 flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  {i !== 1 ? (
                                    <CheckCircle2 className="h-4 w-4 text-qa-success" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-qa-error" />
                                  )}
                                  <span className="font-medium">Run #{5-i}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {i === 0 ? '2 hours ago' : 
                                   i === 1 ? '1 day ago' : 
                                   i === 2 ? '2 days ago' :
                                   i === 3 ? '3 days ago' : '5 days ago'}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">
                                  {i !== 1 ? (
                                    <span className="text-qa-success">All tests passing</span>
                                  ) : (
                                    <span className="text-qa-error">3/4 tests passing</span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Duration: {i === 0 ? '45s' : 
                                            i === 1 ? '48s' : 
                                            i === 2 ? '43s' :
                                            i === 3 ? '46s' : '45s'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="flex items-center justify-between text-sm">
                          <span>Test Code</span>
                          <Badge variant="outline" className="font-mono">JavaScript</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto">
                          <div className="text-slate-500">// Login Test Suite</div>
                          <div className="text-slate-500">// Automated tests for the login functionality</div>
                          <br />
                          <div><span className="text-purple-600">describe</span>(<span className="text-green-600">'Login Functionality'</span>, <span className="text-purple-600">() =&gt;</span> {'{'}</div>
                          <div className="pl-4"><span className="text-purple-600">beforeEach</span>(<span className="text-purple-600">async</span> () => {'{'}</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.goto(<span className="text-green-600">'https://example.com/login'</span>);</div>
                          <div className="pl-4">{'}'});</div>
                          <br />
                          <div className="pl-4"><span className="text-purple-600">it</span>(<span className="text-green-600">'should login with valid credentials'</span>, <span className="text-purple-600">async</span> () => {'{'}</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.fill(<span className="text-green-600">'#username'</span>, <span className="text-green-600">'testuser'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.fill(<span className="text-green-600">'#password'</span>, <span className="text-green-600">'password123'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.click(<span className="text-green-600">'#login-button'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.waitForNavigation();</div>
                          <div className="pl-8"><span className="text-purple-600">const</span> title = <span className="text-purple-600">await</span> page.title();</div>
                          <div className="pl-8">expect(title).toBe(<span className="text-green-600">'Dashboard'</span>);</div>
                          <div className="pl-4">{'}'});</div>
                          <br />
                          <div className="pl-4"><span className="text-purple-600">it</span>(<span className="text-green-600">'should show error with invalid credentials'</span>, <span className="text-purple-600">async</span> () => {'{'}</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.fill(<span className="text-green-600">'#username'</span>, <span className="text-green-600">'invalid'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.fill(<span className="text-green-600">'#password'</span>, <span className="text-green-600">'wrong'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">await</span> page.click(<span className="text-green-600">'#login-button'</span>);</div>
                          <div className="pl-8"><span className="text-purple-600">const</span> errorMsg = <span className="text-purple-600">await</span> page.textContent(<span className="text-green-600">'.error-message'</span>);</div>
                          <div className="pl-8">expect(errorMsg).toContain(<span className="text-green-600">'Invalid credentials'</span>);</div>
                          <div className="pl-4">{'}'});</div>
                          <br />
                          <div>{'}'});</div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">Last executed at {new Date().toLocaleTimeString()}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-slate-100 p-6 mb-4">
                  <Play className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Test Suite Selected</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select a test suite from the list to view details, run tests, or view test history.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Test Suite
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAutomationHub;
