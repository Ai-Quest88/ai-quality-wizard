
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckSquare, AlertCircle, RefreshCw, MessageSquare, Lightbulb, ChevronRight, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

const RequirementAnalysis = () => {
  const [requirement, setRequirement] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | {
    quality: {
      score: number;
      clarity: number;
      testability: number;
      completeness: number;
    };
    issues: Array<{
      type: 'warning' | 'error' | 'info';
      message: string;
    }>;
    suggestions: string[];
    testScenarios: string[];
  }>(null);
  
  const { toast } = useToast();

  const analyzeRequirement = () => {
    if (requirement.trim().length < 10) {
      toast({
        title: "Input too short",
        description: "Please enter a more detailed requirement for analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to LLM service
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock response data
      setAnalysisResults({
        quality: {
          score: 78,
          clarity: 82,
          testability: 75,
          completeness: 68,
        },
        issues: [
          {
            type: 'warning',
            message: 'Missing acceptance criteria'
          },
          {
            type: 'warning',
            message: 'Non-functional requirements not specified'
          },
          {
            type: 'info',
            message: 'Consider adding input validation constraints'
          }
        ],
        suggestions: [
          'Add specific acceptance criteria',
          'Define performance expectations',
          'Specify input validation rules',
          'Include edge case handling'
        ],
        testScenarios: [
          'Verify user can submit valid form data',
          'Verify system handles invalid inputs appropriately',
          'Verify all required fields are validated',
          'Verify successful form submission displays confirmation message'
        ]
      });
      
      toast({
        title: "Analysis complete",
        description: "AI requirement analysis completed successfully",
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-qa-blue" />
            Requirement Analysis
          </CardTitle>
          <CardDescription>
            Analyze requirements to identify quality issues and generate test scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your requirement text here..."
            className="min-h-[200px] resize-none"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              onClick={analyzeRequirement} 
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
                  <MessageSquare className="h-4 w-4" />
                  Analyze Requirement
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-powered insights on requirement quality and testability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quality">
              <TabsList className="mb-4">
                <TabsTrigger value="quality">Quality Score</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quality" className="space-y-6">
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        className="text-muted stroke-current" 
                        strokeWidth="10" 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent"
                      />
                      <circle 
                        className="text-qa-blue stroke-current" 
                        strokeWidth="10" 
                        strokeLinecap="round" 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * analysisResults.quality.score / 100)}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold">{analysisResults.quality.score}</span>
                      <span className="text-sm text-muted-foreground">Overall Score</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Clarity</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{analysisResults.quality.clarity}%</span>
                      <div className="w-24">
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-qa-blue rounded-full" 
                            style={{ width: `${analysisResults.quality.clarity}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Testability</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{analysisResults.quality.testability}%</span>
                      <div className="w-24">
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-qa-blue rounded-full" 
                            style={{ width: `${analysisResults.quality.testability}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Completeness</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{analysisResults.quality.completeness}%</span>
                      <div className="w-24">
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-qa-blue rounded-full" 
                            style={{ width: `${analysisResults.quality.completeness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="issues" className="space-y-4">
                <div className="bg-slate-50 border rounded-md p-4">
                  {analysisResults.issues.map((issue, index) => (
                    <div 
                      key={index} 
                      className="flex items-start py-2 border-b last:border-0 last:pb-0 first:pt-0"
                    >
                      {issue.type === 'warning' && (
                        <AlertCircle className="h-5 w-5 text-qa-warning mr-3 mt-0.5" />
                      )}
                      {issue.type === 'error' && (
                        <AlertCircle className="h-5 w-5 text-qa-error mr-3 mt-0.5" />
                      )}
                      {issue.type === 'info' && (
                        <AlertCircle className="h-5 w-5 text-qa-blue mr-3 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{issue.message}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {issue.type === 'warning' && "This issue may impact testability and quality"}
                          {issue.type === 'error' && "Critical issue that needs to be addressed"}
                          {issue.type === 'info' && "Informational note for improvement"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="space-y-4">
                <div className="space-y-2">
                  {analysisResults.suggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-slate-50 rounded-md p-3 border"
                    >
                      <Lightbulb className="h-5 w-5 text-qa-blue mr-3" />
                      <div className="flex-1">{suggestion}</div>
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Apply All Suggestions
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="scenarios" className="space-y-4">
                <div className="space-y-2">
                  {analysisResults.testScenarios.map((scenario, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-slate-50 rounded-md p-3 border"
                    >
                      <CheckSquare className="h-5 w-5 text-qa-blue mr-3" />
                      <div className="flex-1">{scenario}</div>
                      <Badge variant="outline" className="ml-2">Auto-generated</Badge>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="flex items-center gap-2">
                    Create Test Cases
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-muted-foreground">Analysis completed at {new Date().toLocaleTimeString()}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export Analysis</Button>
              <Button size="sm" onClick={analyzeRequirement}>Analyze Again</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default RequirementAnalysis;
