
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AIBenefitsSection from '@/components/AIBenefitsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <HeroSection />
          <FeaturesSection />
          <AIBenefitsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
