
import React, { useEffect, useRef } from 'react';
import { Brain, Shield, Cpu, Code, Check, RefreshCcw } from 'lucide-react';

const QEAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animation elements
    const elements = container.querySelectorAll('.animate-element');
    
    // Set initial positions
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = `translateY(20px)`;
    });

    // Animate elements
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 300 + (index * 150));
    });

    // Animate icons continuously
    const icons = container.querySelectorAll('.animate-icon');
    icons.forEach((icon) => {
      const element = icon as HTMLElement;
      element.animate(
        [
          { transform: 'translateY(0px)' },
          { transform: 'translateY(-5px)' },
          { transform: 'translateY(0px)' },
        ],
        {
          duration: 2000 + Math.random() * 1000,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    });
    
    // Animate glow effect
    const glow = container.querySelector('.glow-effect') as HTMLElement;
    if (glow) {
      glow.animate(
        [
          { boxShadow: '0 0 30px 10px rgba(14, 165, 233, 0.2)' },
          { boxShadow: '0 0 50px 15px rgba(14, 165, 233, 0.3)' },
          { boxShadow: '0 0 30px 10px rgba(14, 165, 233, 0.2)' },
        ],
        {
          duration: 3000,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-secondary to-background p-8 mb-12">
      {/* Central brain element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glow-effect">
        <div className="bg-qa-blue/10 border border-qa-blue/30 p-6 rounded-full">
          <Brain className="h-20 w-20 text-qa-blue animate-icon" />
        </div>
      </div>
      
      {/* Orbiting icons */}
      <div className="absolute top-[30%] left-[25%]">
        <div className="bg-qa-success/10 border border-qa-success/30 p-3 rounded-full">
          <Check className="h-8 w-8 text-qa-success animate-icon" />
        </div>
      </div>
      
      <div className="absolute top-[20%] right-[30%]">
        <div className="bg-qa-warning/10 border border-qa-warning/30 p-3 rounded-full">
          <Shield className="h-8 w-8 text-qa-warning animate-icon" />
        </div>
      </div>
      
      <div className="absolute bottom-[30%] left-[30%]">
        <div className="bg-accent/10 border border-accent/30 p-3 rounded-full">
          <Cpu className="h-8 w-8 text-accent animate-icon" />
        </div>
      </div>
      
      <div className="absolute bottom-[25%] right-[25%]">
        <div className="bg-primary/10 border border-primary/30 p-3 rounded-full">
          <Code className="h-8 w-8 text-primary animate-icon" />
        </div>
      </div>
      
      <div className="absolute top-1/2 right-[15%]">
        <div className="bg-qa-blue/10 border border-qa-blue/30 p-3 rounded-full">
          <RefreshCcw className="h-8 w-8 text-qa-blue animate-icon" />
        </div>
      </div>
      
      {/* Connecting lines using CSS */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="w-full h-full" style={{ position: 'absolute' }}>
          <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="70%" y2="20%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
        </svg>
      </div>
      
      {/* Text overlay */}
      <div className="absolute bottom-8 left-8 right-8 text-center animate-element">
        <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2">AI-Powered Quality Engineering</h2>
        <p className="text-muted-foreground text-sm md:text-base">Intelligent test automation, smart analysis, and predictive quality insights</p>
      </div>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-qa-blue/20 rounded-full"
          style={{
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default QEAnimation;
