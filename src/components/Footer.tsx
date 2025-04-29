
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container text-center text-sm text-muted-foreground">
        AIQE &copy; {new Date().getFullYear()} - AI-powered Quality Engineering Platform
      </div>
    </footer>
  );
};

export default Footer;
