import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function BinomialDistribution() {
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.5);

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= n; x++) {
      points.push({
        x: x.toString(),
        y: jStat.binomial.pdf(x, n, p)
      });
    }
    return points;
  }, [n, p]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Binomial Distribution</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Number of Trials (n): {n}</label>
          <input 
            type="range" 
            min="1" max="100" step="1" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Probability of Success (p): {p}</label>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={p} 
            onChange={(e) => setP(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="y" fill="#0070f3" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}