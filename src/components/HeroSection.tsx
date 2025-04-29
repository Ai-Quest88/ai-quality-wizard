
import React from 'react';
import QEAnimation from '@/components/QEAnimation';

const HeroSection = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-qa-blue to-accent">AIQE</span>
        <span className="ml-2">Platform</span>
      </h1>
      <p className="text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
        The AI-powered Quality Engineering Platform. Enhance your testing process with automated test execution, 
        requirement analysis, and AI-assisted test case generation.
      </p>
      
      <QEAnimation />
    </div>
  );
};

export default HeroSection;
