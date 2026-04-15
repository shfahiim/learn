import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { jStat } from 'jstat';

export function TDistribution() {
  const [df, setDf] = useState(1);

  const data = useMemo(() => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        't-Distribution': jStat.studentt.pdf(x, df),
        'Normal (Reference)': jStat.normal.pdf(x, 0, 1)
      });
    }
    return points;
  }, [df]);

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Student's t-Distribution</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Degrees of Freedom (df): {df}</label>
          <input 
            type="range" className="modern-slider" 
            min="1" max="30" step="1" 
            value={df} 
            onChange={(e) => setDf(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[-5, 5]} />
            <YAxis domain={[0, 0.45]} />
            <Tooltip />
            <Area type="monotone" dataKey="t-Distribution" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
            <Area type="monotone" dataKey="Normal (Reference)" stroke="#9ca3af" fill="none" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}