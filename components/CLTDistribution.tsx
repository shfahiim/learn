import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// A simple deterministic random number generator for React states
function lcg(seed: number) {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

export function CLTDistribution() {
  const [sampleSize, setSampleSize] = useState(2);
  const [numDraws, setNumDraws] = useState(100);

  const data = useMemo(() => {
    // Generate sample means from a perfectly UNIFORM distribution [0, 1]
    const means = [];
    const rng = lcg(42); // fixed seed so it doesn't wildly jump on re-renders
    
    for (let i = 0; i < numDraws; i++) {
        let sum = 0;
        for (let j = 0; j < sampleSize; j++) {
            sum += rng(); // Draw from Uniform[0,1]
        }
        means.push(sum / sampleSize);
    }
    
    // Bin the means to create a histogram
    const bins = new Array(20).fill(0);
    means.forEach(mean => {
        const binIndex = Math.min(19, Math.floor(mean * 20));
        bins[binIndex]++;
    });
    
    return bins.map((count, i) => ({
        range: `${(i * 0.05).toFixed(2)} - ${((i + 1) * 0.05).toFixed(2)}`,
        Count: count
    }));

  }, [sampleSize, numDraws]);

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Central Limit Theorem (Sampling from Uniform)</h3>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem', color: 'inherit' }}>
        We are drawing random numbers from a flat, rectangular distribution. Notice what shape the averages make!
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Sample Size (n): {sampleSize}</label>
          <input 
            type="range" className="modern-slider" 
            min="1" max="50" step="1" 
            value={sampleSize} 
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Number of Samples Drawn: {numDraws}</label>
          <input 
            type="range" className="modern-slider" 
            min="10" max="5000" step="10" 
            value={numDraws} 
            onChange={(e) => setNumDraws(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="range" tick={{fontSize: 10}} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}