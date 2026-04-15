import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function ExponentialDistribution() {
  const [lambda, setLambda] = useState(1);

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.exponential.pdf(x, lambda)
      });
    }
    return points;
  }, [lambda]);

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Exponential Distribution</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rate Parameter (λ): {lambda}</label>
        <input 
          type="range" className="modern-slider" 
          min="0.1" max="5" step="0.1" 
          value={lambda} 
          onChange={(e) => setLambda(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 5]} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Density" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}