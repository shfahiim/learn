import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function UniformDistribution() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(5);

  const data = useMemo(() => {
    const points = [];
    const minVal = Math.min(a, b);
    const maxVal = Math.max(a, b);
    
    // Add points before 'a'
    for (let x = 0; x < minVal; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: 0 });
    }
    
    // The flat top
    const height = 1 / (maxVal - minVal);
    points.push({ x: minVal, Density: height });
    for (let x = minVal + 0.5; x < maxVal; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: height });
    }
    points.push({ x: maxVal, Density: height });
    
    // Add points after 'b'
    for (let x = maxVal + 0.5; x <= 10; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: 0 });
    }
    
    return points;
  }, [a, b]);

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Uniform Distribution (Continuous)</h3>
      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Minimum (a): {Math.min(a, b)}</label>
          <input 
            type="range" className="modern-slider" 
            min="0" max="9" step="1" 
            value={Math.min(a, b)} 
            onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val < Math.max(a, b)) setA(val);
            }}
            style={{ width: '100%' }}
          />
        </div>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Maximum (b): {Math.max(a, b)}</label>
          <input 
            type="range" className="modern-slider" 
            min="1" max="10" step="1" 
            value={Math.max(a, b)} 
            onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > Math.min(a, b)) setB(val);
            }}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 10]} />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Area type="stepAfter" dataKey="Density" stroke="var(--chart-primary)" fill="var(--chart-primary)" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}