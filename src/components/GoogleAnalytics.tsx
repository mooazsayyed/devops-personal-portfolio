import { useEffect } from 'react';

export function GoogleAnalytics() {
  useEffect(() => {
    // Simple pageview tracking
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      fetch(`https://www.google-analytics.com/collect?v=1&tid=G-ELMD14EX4C&cid=${Math.random() * 1000}&t=pageview&dp=%2F`);
    }
  }, []);

  return null;
}