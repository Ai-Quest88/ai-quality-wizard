
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TestCaseGeneration from '@/components/TestCaseGeneration';

const TestCreation = () => {
  const [requirements, setRequirements] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const { toast } = useToast();

  const analyzeRequirements = () => {
    if (requirements.trim().length < 10) {
      toast({
        title: "Input too short",
        description: "Please enter more detailed requirements for analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowTestCases(true);
      
      toast({
        title: "Analysis complete",
        description: "Requirements analyzed successfully",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Test Creation</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-qa-blue" />
            Requirement Analysis
          </CardTitle>
          <CardDescription>
            Enter your requirements to analyze and generate test cases
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
              onClick={analyzeRequirements} 
              className="flex items-center gap-2"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Analyze & Generate Test Cases
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showTestCases && <TestCaseGeneration />}
    </div>
  );
};

export default TestCreation;
