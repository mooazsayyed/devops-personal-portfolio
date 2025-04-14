import { useEffect } from 'react';

// Declare the gtag function and dataLayer on the window object
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Only initialize if not already loaded
    if (!window.dataLayer || !window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-ELMD14EX4C');
    }

    // Remove cleanup function entirely
  }, []);

  return null;
}