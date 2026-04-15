import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { jStat } from 'jstat';

export function NormalDistribution() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);

  const data = useMemo(() => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        y: jStat.normal.pdf(x, mean, stdDev)
      });
    }
    return points;
  }, [mean, stdDev]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Normal Distribution</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mean (μ): {mean}</label>
          <input 
            type="range" 
            min="-3" max="3" step="0.1" 
            value={mean} 
            onChange={(e) => setMean(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Standard Deviation (σ): {stdDev}</label>
          <input 
            type="range" 
            min="0.1" max="3" step="0.1" 
            value={stdDev} 
            onChange={(e) => setStdDev(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[-5, 5]} tickCount={11} />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Area type="monotone" dataKey="y" stroke="#0070f3" fill="#0070f3" fillOpacity={0.2} isAnimationActive={false} />
            <ReferenceLine x={mean} stroke="#ff0000" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}