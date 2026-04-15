import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CorrelationViz() {
  const [correlation, setCorrelation] = useState(0.8);
  const [hetero, setHetero] = useState(false);

  const data = useMemo(() => {
    const points = [];
    for(let i=0; i<100; i++) {
      let x = (Math.random() * 10) - 5;
      let noise = (Math.random() * 4) - 2;
      
      if (hetero) {
        noise = noise * Math.abs(x); 
      }
      
      let y = (correlation * x) + ((1 - Math.abs(correlation)) * noise * 3);
      points.push({x: Number(x.toFixed(2)), y: Number(y.toFixed(2))});
    }
    return points;
  }, [correlation, hetero]);

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Scatter Plot</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correlation (r): {correlation.toFixed(2)}</label>
          <input 
            type="range" className="modern-slider" 
            min="-1" max="1" step="0.1" 
            value={correlation} onChange={(e) => setCorrelation(parseFloat(e.target.value))}
          />
        </div>
        <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input type="checkbox" checked={hetero} onChange={(e) => setHetero(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--chart-primary)' }}/>
            Enable Heteroscedasticity (Cone-shape)
          </label>
        </div>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis type="number" dataKey="x" name="X" domain={[-5, 5]} />
            <YAxis type="number" dataKey="y" name="Y" domain={[-10, 10]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Points" data={data} fill="var(--chart-primary)" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}