
import React from 'react';
import { Cpu } from 'lucide-react';

const AIBenefitsSection = () => {
  const benefits = [
    'Reduce manual testing effort by up to 80% with intelligent test automation',
    'Identify edge cases and scenarios human testers might miss',
    'Continuously monitor applications for quality issues without manual intervention',
    'Generate comprehensive test reports with actionable insights',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8">
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-qa-blue" />
          Why Use AI for Testing?
        </h3>
        <ul className="space-y-3 text-sm">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="min-w-4 mt-1 w-4 h-4 rounded-full bg-qa-blue/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-qa-blue"></div>
              </div>
              <p>{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIBenefitsSection;
