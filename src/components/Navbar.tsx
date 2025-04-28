
import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, FileText, Brain, LayoutDashboard, Settings, Code } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center gap-2">
          <Bug className="h-6 w-6 text-qa-blue" />
          <span className="text-xl font-bold">AIQE</span>
        </div>
        
        <nav className="flex flex-1 items-center gap-6 text-sm sm:gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <span>Home</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/test-creation" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <FileText className="h-4 w-4" />
            <span>Test Creation</span>
          </Link>
          <Link to="/test-automation" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <Code className="h-4 w-4" />
            <span>Test Automation</span>
          </Link>
          <Link to="/ai-test-execution" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <Brain className="h-4 w-4" />
            <span>Test Execution</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-1 font-medium text-foreground hover:text-qa-blue">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
