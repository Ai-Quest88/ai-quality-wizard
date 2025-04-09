
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Play, Code, RefreshCw } from 'lucide-react';

const TestAutomationHub = () => {
  const { toast } = useToast();
  const [testDescription, setTestDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleGenerateTest = () => {
    if (testDescription.trim().length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide a more detailed test description"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedCode("");
    
    // Simulate API call for code generation
    setTimeout(() => {
      const sampleCode = `
// Automatically generated test code
const { test, expect } = require('@playwright/test');

test('${testDescription.split('\n')[0]}', async ({ page }) => {
  // Navigate to the application
  await page.goto('https://example.com');
  
  // Find and interact with elements
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Assert that login was successful
  await expect(page.getByText('Welcome, testuser!')).toBeVisible();
  
  // Additional test steps based on requirements
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.url()).toContain('/profile');
  
  // Verify profile information is displayed
  await expect(page.getByText('User Information')).toBeVisible();
});`;
      
      setGeneratedCode(sampleCode);
      setIsGenerating(false);
      
      toast({
        title: "Test Generated",
        description: "Automated test code has been generated successfully"
      });
    }, 3000);
  };

  const handleExecuteTest = () => {
    if (!generatedCode) {
      toast({
        title: "No test code",
        description: "Please generate a test before executing",
        variant: "destructive"
      });
      return;
    }
    
    setIsExecuting(true);
    
    // Simulate test execution
    setTimeout(() => {
      setIsExecuting(false);
      
      toast({
        title: "Test Executed",
        description: "Test ran successfully with 5 passing assertions"
      });
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Automation</CardTitle>
          <CardDescription>
            Generate automated test code from your test description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Describe your test scenario in detail..."
              className="min-h-[150px]"
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleGenerateTest}
              disabled={isGenerating || testDescription.length < 10}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Code className="h-4 w-4" />
                  Generate Test
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Test Code</CardTitle>
            <CardDescription>
              Ready to execute automated test script
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] font-mono text-sm"
              value={generatedCode}
              readOnly
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleExecuteTest}
              disabled={isExecuting}
              className="flex items-center gap-2"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Execute Test
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TestAutomationHub;
