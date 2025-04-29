
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AITestExecution from "./components/AITestExecution";
import TestAutomationHub from "./components/TestAutomationHub";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TestCreation from "./pages/TestCreation";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1">
      <div className="container py-8">
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

const App = () => {
  // Update document title
  useEffect(() => {
    document.title = 'AIQE - AI Quality Engineering';
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/dashboard" 
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AppLayout>
                  <Settings />
                </AppLayout>
              } 
            />
            <Route 
              path="/ai-test-execution" 
              element={
                <AppLayout>
                  <h1 className="text-2xl font-bold mb-6">AI Test Execution</h1>
                  <AITestExecution />
                </AppLayout>
              } 
            />
            <Route 
              path="/test-creation" 
              element={
                <AppLayout>
                  <TestCreation />
                </AppLayout>
              } 
            />
            <Route 
              path="/test-automation" 
              element={
                <AppLayout>
                  <h1 className="text-2xl font-bold mb-6">Test Automation</h1>
                  <TestAutomationHub />
                </AppLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
