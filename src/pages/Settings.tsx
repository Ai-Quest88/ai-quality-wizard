
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Github, Gitlab, FileJson, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schemas for our forms
const gitSchema = z.object({
  repositoryUrl: z.string().url("Please enter a valid URL"),
  username: z.string().min(1, "Username is required"),
  token: z.string().min(1, "API token is required"),
});

const jiraSchema = z.object({
  jiraUrl: z.string().url("Please enter a valid Jira URL"),
  username: z.string().email("Please enter a valid email"),
  apiToken: z.string().min(1, "API token is required"),
  projectKey: z.string().min(1, "Project key is required"),
});

type GitFormValues = z.infer<typeof gitSchema>;
type JiraFormValues = z.infer<typeof jiraSchema>;

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("git");
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");

  // Git form
  const gitForm = useForm<GitFormValues>({
    resolver: zodResolver(gitSchema),
    defaultValues: {
      repositoryUrl: "",
      username: "",
      token: "",
    },
  });

  // Jira form
  const jiraForm = useForm<JiraFormValues>({
    resolver: zodResolver(jiraSchema),
    defaultValues: {
      jiraUrl: "",
      username: "",
      apiToken: "",
      projectKey: "",
    },
  });

  const onGitSubmit = (data: GitFormValues) => {
    console.log("Git integration data:", data);
    toast({
      title: "Git Integration Saved",
      description: `Successfully connected to ${gitProvider === "github" ? "GitHub" : "GitLab"} repository.`,
    });
  };

  const onJiraSubmit = (data: JiraFormValues) => {
    console.log("Jira integration data:", data);
    toast({
      title: "Jira Integration Saved",
      description: "Successfully connected to Jira project.",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Integration Settings</h1>
      <p className="text-muted-foreground">
        Connect your Git repositories and Jira projects to enable automated test synchronization.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="git">Git Integration</TabsTrigger>
          <TabsTrigger value="jira">Jira Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="git" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect Git Repository</CardTitle>
              <CardDescription>
                Link your test automation code repository to enable CI/CD integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select Git Provider</h3>
                <div className="flex gap-4">
                  <Button 
                    variant={gitProvider === "github" ? "default" : "outline"}
                    onClick={() => setGitProvider("github")}
                    className="flex gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </Button>
                  <Button 
                    variant={gitProvider === "gitlab" ? "default" : "outline"}
                    onClick={() => setGitProvider("gitlab")}
                    className="flex gap-2"
                  >
                    <Gitlab className="h-5 w-5" />
                    GitLab
                  </Button>
                </div>
              </div>
              
              <Form {...gitForm}>
                <form onSubmit={gitForm.handleSubmit(onGitSubmit)} className="space-y-6">
                  <FormField
                    control={gitForm.control}
                    name="repositoryUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repository URL</FormLabel>
                        <FormControl>
                          <Input placeholder={`https://${gitProvider}.com/username/repository`} {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL of your {gitProvider === "github" ? "GitHub" : "GitLab"} repository
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={gitForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Your username" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={gitForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Access Token</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Your access token" {...field} />
                        </FormControl>
                        <FormDescription>
                          Create a token with repo access on {gitProvider === "github" ? "GitHub" : "GitLab"}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Check className="mr-2 h-4 w-4" />
                    Connect Repository
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jira" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect Jira</CardTitle>
              <CardDescription>
                Link your Jira project to sync test cases and report test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...jiraForm}>
                <form onSubmit={jiraForm.handleSubmit(onJiraSubmit)} className="space-y-6">
                  <FormField
                    control={jiraForm.control}
                    name="jiraUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jira Site URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-company.atlassian.net" {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL of your Jira instance
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={jiraForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="The email you use for Jira" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={jiraForm.control}
                    name="apiToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Token</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Your Jira API token" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Create an API token from your Atlassian account settings
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={jiraForm.control}
                    name="projectKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Key</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., PROJ" {...field} />
                        </FormControl>
                        <FormDescription>
                          The key for your Jira project (e.g., PROJ, QA)
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <FileJson className="mr-2 h-4 w-4" />
                    Connect Jira
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
