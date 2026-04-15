import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function ChiSquareDistribution() {
  const [k, setK] = useState(3);

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.1; x <= 20; x += 0.2) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.chisquare.pdf(x, k)
      });
    }
    return points;
  }, [k]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Chi-Square Distribution</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Degrees of Freedom (k): {k}</label>
          <input 
            type="range" 
            min="1" max="15" step="1" 
            value={k} 
            onChange={(e) => setK(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 20]} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Density" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}