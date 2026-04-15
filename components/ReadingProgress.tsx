import React, { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate how far the user has scrolled
      const scrollableDistance = documentHeight - windowHeight;
      const currentProgress = scrollableDistance > 0 ? (scrollTop / scrollableDistance) * 100 : 0;
      
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ 
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '44px', 
      height: '44px',
      backgroundColor: 'var(--chart-panel-bg)',
      backdropFilter: 'blur(8px)',
      borderRadius: '50%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--chart-border)'
    }}>
      <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke="var(--chart-muted)"
          strokeOpacity={0.2}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="var(--chart-primary)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
}