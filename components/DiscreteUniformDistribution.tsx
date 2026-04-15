import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function DiscreteUniformDistribution() {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(6);

  const data = useMemo(() => {
    const points = [];
    const a = Math.min(minVal, maxVal);
    const b = Math.max(minVal, maxVal);
    const n = b - a + 1;
    const prob = 1 / n;
    
    for (let x = a; x <= b; x++) {
      points.push({
        x: x.toString(),
        Probability: prob
      });
    }
    return points;
  }, [minVal, maxVal]);

  return (
    <div style={{ padding: '1rem', border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Discrete Uniform Distribution</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Minimum (a): {Math.min(minVal, maxVal)}</label>
          <input 
            type="range" className="modern-slider" 
            min="0" max="10" step="1" 
            value={Math.min(minVal, maxVal)} 
            onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val <= Math.max(minVal, maxVal)) setMinVal(val);
            }}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Maximum (b): {Math.max(minVal, maxVal)}</label>
          <input 
            type="range" className="modern-slider" 
            min="1" max="20" step="1" 
            value={Math.max(minVal, maxVal)} 
            onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= Math.min(minVal, maxVal)) setMaxVal(val);
            }}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Bar dataKey="Probability" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}