import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function BernoulliDistribution() {
  const [p, setP] = useState(0.5);

  const data = useMemo(() => {
    return [
      { outcome: 'Failure (0)', Probability: 1 - p },
      { outcome: 'Success (1)', Probability: p }
    ];
  }, [p]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Bernoulli Distribution</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Probability of Success (p): {p}</label>
        <input 
          type="range" 
          min="0" max="1" step="0.01" 
          value={p} 
          onChange={(e) => setP(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="outcome" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Bar dataKey="Probability" fill="#8884d8" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}