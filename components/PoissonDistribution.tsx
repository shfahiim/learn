import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function PoissonDistribution() {
  const [lambda, setLambda] = useState(5);

  const data = useMemo(() => {
    const points = [];
    const maxK = Math.max(20, Math.ceil(lambda * 2.5));
    for (let k = 0; k <= maxK; k++) {
      points.push({
        k: k.toString(),
        Probability: jStat.poisson.pdf(k, lambda)
      });
    }
    return points;
  }, [lambda]);

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Poisson Distribution</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Average Rate (λ): {lambda}</label>
        <input 
          type="range" className="modern-slider" 
          min="1" max="50" step="1" 
          value={lambda} 
          onChange={(e) => setLambda(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="k" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Probability" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}