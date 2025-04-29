
import React from 'react';
import { Shield, LayoutDashboard, FileText, Code, Brain, Settings } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Dashboard',
      description: 'Quality engineering metrics',
      content: 'View detailed quality metrics, trends, and insights to make data-driven decisions about your testing strategy.',
      icon: LayoutDashboard,
      link: '/dashboard',
      linkText: 'View',
    },
    {
      title: 'Test Creation',
      description: 'Create tests from requirements',
      content: 'Automatically generate comprehensive test cases from your requirements and user stories using AI.',
      icon: FileText,
      link: '/requirements',
      linkText: 'Create',
    },
    {
      title: 'Test Automation',
      description: 'Generate automated test code',
      content: 'Transform manual test cases into automated test scripts with AI-powered code generation.',
      icon: Code,
      link: '/test-automation',
      linkText: 'Automate',
    },
    {
      title: 'Test Execution',
      description: 'Execute tests with AI agents',
      content: 'Run intelligent tests on applications using AI agents that can interact with web interfaces like a real user.',
      icon: Brain,
      link: '/ai-test-execution',
      linkText: 'Execute',
    },
    {
      title: 'Settings',
      description: 'Configure integrations',
      content: 'Connect to Git repositories and Jira projects to streamline your quality engineering workflow.',
      icon: Settings,
      link: '/settings',
      linkText: 'Configure',
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-qa-blue" />
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.title}
            title={feature.title}
            description={feature.description}
            content={feature.content}
            icon={feature.icon}
            link={feature.link}
            linkText={feature.linkText}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
