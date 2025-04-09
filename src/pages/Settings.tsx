
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Github, GitBranch, GitPullRequest, Check, LayoutGrid, RefreshCcw, Shield, FileCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [gitProvider, setGitProvider] = useState('github');
  const { toast } = useToast();
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
    });
  };
  
  const handleConnectGit = () => {
    toast({
      title: "Connected to GitHub",
      description: "Your repository has been connected successfully",
    });
  };
  
  const handleConnectJira = () => {
    toast({
      title: "Connected to Jira",
      description: "Your Jira project has been connected successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your testing environment and integrations</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="git">Git Integration</TabsTrigger>
          <TabsTrigger value="jira">Jira Integration</TabsTrigger>
          <TabsTrigger value="api">API & Tokens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your testing environment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" defaultValue="AIQE Testing Project" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="default-browser">Default Browser</Label>
                    <Select defaultValue="chrome">
                      <SelectTrigger id="default-browser">
                        <SelectValue placeholder="Select browser" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chrome">Chrome</SelectItem>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="default-resolution">Default Resolution</Label>
                    <Select defaultValue="1920x1080">
                      <SelectTrigger id="default-resolution">
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">1920 x 1080</SelectItem>
                        <SelectItem value="1366x768">1366 x 768</SelectItem>
                        <SelectItem value="360x640">360 x 640 (Mobile)</SelectItem>
                        <SelectItem value="768x1024">768 x 1024 (Tablet)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications for test results
                    </div>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save">Auto-save Test Results</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically save all test execution results
                    </div>
                  </div>
                  <Switch id="auto-save" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="git">
          <Card>
            <CardHeader>
              <CardTitle>Git Repository Integration</CardTitle>
              <CardDescription>Connect your Git repository to store and version your test automation code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Git Provider</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Button 
                      variant={gitProvider === 'github' ? "default" : "outline"} 
                      className="justify-start" 
                      onClick={() => setGitProvider('github')}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button 
                      variant={gitProvider === 'gitlab' ? "default" : "outline"} 
                      className="justify-start" 
                      onClick={() => setGitProvider('gitlab')}
                    >
                      <FileCode className="mr-2 h-4 w-4" />
                      GitLab
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="repo-url">Repository URL</Label>
                  <Input id="repo-url" placeholder="https://github.com/username/repo" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <div className="flex gap-2">
                      <Input id="branch" defaultValue="main" />
                      <Button variant="outline" size="icon">
                        <GitBranch className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="access-token">Access Token</Label>
                    <Input id="access-token" type="password" placeholder="••••••••••••••••" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code-path">Test Code Path</Label>
                  <Input id="code-path" placeholder="tests/" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Where to store generated test code in your repository
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-push">Auto-push Generated Tests</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically push generated test code to the repository
                    </div>
                  </div>
                  <Switch id="auto-push" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-pr">Create Pull Requests</Label>
                    <div className="text-sm text-muted-foreground">
                      Create PRs for changes to test automation code
                    </div>
                  </div>
                  <Switch id="auto-pr" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Connection</Button>
              <Button onClick={handleConnectGit}>Connect Repository</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="jira">
          <Card>
            <CardHeader>
              <CardTitle>Jira Integration</CardTitle>
              <CardDescription>Connect to Jira to link test results with issues and track quality metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jira-url">Jira URL</Label>
                  <Input id="jira-url" placeholder="https://your-domain.atlassian.net" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jira-project">Project Key</Label>
                    <Input id="jira-project" placeholder="QA" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jira-token">API Token</Label>
                    <Input id="jira-token" type="password" placeholder="••••••••••••••••" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jira-email">Jira Email</Label>
                  <Input id="jira-email" type="email" placeholder="your-email@example.com" />
                </div>
                
                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Issue Mapping</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Failed Tests</Label>
                        <Select defaultValue="bug">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">Bug</SelectItem>
                            <SelectItem value="task">Task</SelectItem>
                            <SelectItem value="story">Story</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">Test Execution</Label>
                        <Select defaultValue="task">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">Bug</SelectItem>
                            <SelectItem value="task">Task</SelectItem>
                            <SelectItem value="story">Story</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-issues">Auto-create Issues</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically create Jira issues for test failures
                    </div>
                  </div>
                  <Switch id="auto-issues" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-metrics">Sync Test Metrics</Label>
                    <div className="text-sm text-muted-foreground">
                      Sync test metrics with Jira dashboards
                    </div>
                  </div>
                  <Switch id="sync-metrics" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Connection</Button>
              <Button onClick={handleConnectJira}>Connect to Jira</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & Access Tokens</CardTitle>
              <CardDescription>Manage API keys and access tokens for integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" readOnly value="••••••••••••••••••••••••••••••••" />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this API key to access the AIQE API programmatically
                  </p>
                </div>
                
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">CI Integration Token</h3>
                      <p className="text-sm text-muted-foreground">For continuous integration systems</p>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Browser Agent Token</h3>
                      <p className="text-sm text-muted-foreground">For browser-use agent access</p>
                    </div>
                    <Button variant="default" size="sm">Manage</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Webhook Secret</h3>
                      <p className="text-sm text-muted-foreground">For securing webhooks</p>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save API Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
