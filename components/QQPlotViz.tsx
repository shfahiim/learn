import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function QQPlotViz() {
  const [skew, setSkew] = useState(0);

  const data = useMemo(() => {
    const points = [];
    for(let i=1; i<=50; i++) {
      const theoQuantile = (i - 25) / 10;
      let sampleQuantile = theoQuantile;
      if (skew > 0) sampleQuantile += Math.pow(Math.max(0, theoQuantile), 2) * (skew/5);
      if (skew < 0) sampleQuantile -= Math.pow(Math.abs(Math.min(0, theoQuantile)), 2) * (Math.abs(skew)/5);
      
      points.push({
        theo: Number(theoQuantile.toFixed(2)),
        sample: Number(sampleQuantile.toFixed(2)),
        line: Number(theoQuantile.toFixed(2))
      });
    }
    return points;
  }, [skew]);

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Interactive Q-Q Plot</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Data Skewness: {skew === 0 ? 'Perfectly Normal' : skew > 0 ? 'Right Skewed' : 'Left Skewed'}</label>
        <input 
          type="range" className="modern-slider" 
          min="-5" max="5" step="0.5" 
          value={skew} onChange={(e) => setSkew(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis type="number" dataKey="theo" name="Theoretical Quantiles" domain={[-3, 3]} />
            <YAxis type="number" dataKey="sample" name="Sample Quantiles" domain={[-5, 5]} />
            <Tooltip />
            <Scatter name="Data" dataKey="sample" fill="var(--chart-primary)" />
            <Line type="linear" dataKey="line" stroke="var(--chart-danger)" dot={false} strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}