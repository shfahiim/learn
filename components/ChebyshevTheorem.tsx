import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

export function ChebyshevTheorem() {
  const [k, setK] = useState(2); // Number of standard deviations
  
  const minPercent = useMemo(() => {
    return (1 - (1 / (k * k))) * 100;
  }, [k]);

  // Generate a mock bimodal (non-normal) distribution to prove the theorem
  const data = useMemo(() => {
      const points = [];
      for (let i = -5; i <= 5; i += 0.5) {
          let height = 10;
          if (i < -3 || i > 3) height = 2;
          if (i === -2 || i === 2) height = 40; // Bimodal peaks
          if (i > -1 && i < 1) height = 5;
          points.push({
              x: i.toFixed(1),
              Density: height
          });
      }
      return points;
  }, []);

  return (
    <div style={{ padding: '1.5rem', border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Chebyshev's Inequality</h3>
      
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--chart-bg)', borderRadius: '0.5rem' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', color: 'inherit' }}>
              At least <strong style={{ fontSize: '1.5rem', color: '#c026d3' }}>{minPercent.toFixed(1)}%</strong> of the data must fall within <strong>{k} standard deviations</strong> from the mean!
          </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Standard Deviations (k): {k}</label>
          <input 
            type="range" className="modern-slider" min="1.1" max="5" step="0.1" 
            value={k} onChange={(e) => setK(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#a21caf' }}>
          <em>The pink shaded area shows the bounds of ±{k}σ. Even for this weird, two-humped distribution, the mathematical guarantee holds true!</em>
      </p>

      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <ReferenceArea x1={(-k).toFixed(1)} x2={(k).toFixed(1)} fill="#fbcfe8" fillOpacity={0.6} />
            <Bar dataKey="Density" fill="#c026d3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}