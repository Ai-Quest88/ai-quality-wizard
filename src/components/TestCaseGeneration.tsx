
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, FileText, RefreshCw, Download, PlayCircle, Copy, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const TestCaseGeneration = () => {
  const [requirements, setRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [testCases, setTestCases] = useState<Array<{
    id: string;
    title: string;
    description: string;
    steps: string[];
    expectedResults: string[];
    priority: 'high' | 'medium' | 'low';
    type: 'functional' | 'ui' | 'api' | 'performance';
    automatable: boolean;
  }> | null>(null);
  
  const { toast } = useToast();

  const generateTestCases = () => {
    if (requirements.trim().length < 10) {
      toast({
        title: "Input too short",
        description: "Please enter more detailed requirements for test case generation",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to LLM service
    setTimeout(() => {
      setIsGenerating(false);
      
      // Mock response data
      setTestCases([
        {
          id: 'TC-001',
          title: 'Verify Login with Valid Credentials',
          description: 'Test case to verify that a user can successfully login with valid credentials',
          steps: [
            'Navigate to the login page',
            'Enter valid username',
            'Enter valid password',
            'Click on the login button'
          ],
          expectedResults: [
            'User is successfully logged in',
            'User is redirected to the dashboard page',
            'Success message is displayed'
          ],
          priority: 'high',
          type: 'functional',
          automatable: true
        },
        {
          id: 'TC-002',
          title: 'Verify Login with Invalid Credentials',
          description: 'Test case to verify that system shows appropriate error message when invalid credentials are used',
          steps: [
            'Navigate to the login page',
            'Enter invalid username',
            'Enter invalid password',
            'Click on the login button'
          ],
          expectedResults: [
            'User is not logged in',
            'Error message is displayed',
            'User remains on the login page'
          ],
          priority: 'high',
          type: 'functional',
          automatable: true
        },
        {
          id: 'TC-003',
          title: 'Verify Password Recovery',
          description: 'Test case to verify that user can recover password using email',
          steps: [
            'Navigate to the login page',
            'Click on "Forgot Password" link',
            'Enter registered email',
            'Click on submit button'
          ],
          expectedResults: [
            'System sends password recovery email',
            'Confirmation message is displayed',
            'Password recovery link in email is valid'
          ],
          priority: 'medium',
          type: 'functional',
          automatable: true
        },
        {
          id: 'TC-004',
          title: 'Verify Login UI Elements',
          description: 'Test case to verify all UI elements are properly displayed on login page',
          steps: [
            'Navigate to the login page',
            'Check all UI elements'
          ],
          expectedResults: [
            'Username input field is visible',
            'Password input field is visible',
            'Login button is visible and enabled',
            'Forgot password link is visible',
            'Registration link is visible'
          ],
          priority: 'low',
          type: 'ui',
          automatable: true
        },
        {
          id: 'TC-005',
          title: 'Verify Login API Response',
          description: 'Test case to verify API response for login request',
          steps: [
            'Send POST request to /api/login with valid credentials',
            'Check response status and body'
          ],
          expectedResults: [
            'API returns 200 OK status',
            'Response includes authentication token',
            'Response time is under 500ms'
          ],
          priority: 'medium',
          type: 'api',
          automatable: true
        }
      ]);
      
      toast({
        title: "Generation complete",
        description: "5 test cases have been generated successfully",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-qa-blue" />
            Test Case Generation
          </CardTitle>
          <CardDescription>
            Generate comprehensive test cases from requirements using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your requirements or user stories here..."
            className="min-h-[200px] resize-none"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              onClick={generateTestCases} 
              className="flex items-center gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Generate Test Cases
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {testCases && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Test Cases</span>
              <Badge variant="outline">{testCases.length} Tests</Badge>
            </CardTitle>
            <CardDescription>
              AI-generated test cases based on your requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Input 
                placeholder="Search test cases..." 
                className="max-w-sm"
              />
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-4 space-y-4">
                {testCases.map((testCase, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                            {testCase.id}
                          </span>
                          {testCase.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              testCase.priority === 'high' ? 'bg-qa-error' :
                              testCase.priority === 'medium' ? 'bg-qa-warning' : 'bg-qa-blue'
                            }
                          >
                            {testCase.priority}
                          </Badge>
                          <Badge variant="outline">{testCase.type}</Badge>
                        </div>
                      </div>
                      <CardDescription>
                        {testCase.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Test Steps</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm">
                            {testCase.steps.map((step, i) => (
                              <li key={i} className="text-muted-foreground">{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Expected Results</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {testCase.expectedResults.map((result, i) => (
                              <li key={i} className="text-muted-foreground">{result}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2 border-t flex justify-between">
                      <div className="flex items-center">
                        <CheckCircle2 
                          className={testCase.automatable ? "h-4 w-4 text-qa-success mr-1" : "h-4 w-4 text-muted-foreground mr-1"} 
                        />
                        <span className="text-xs text-muted-foreground">
                          {testCase.automatable ? 'Automatable' : 'Manual Test'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-muted-foreground">Generated at {new Date().toLocaleTimeString()}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Button size="sm" onClick={generateTestCases}>Regenerate</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TestCaseGeneration;
