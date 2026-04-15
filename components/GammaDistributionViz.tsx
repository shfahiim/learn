import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function GammaDistributionViz() {
  const [k, setK] = useState(2); // Shape
  const [theta, setTheta] = useState(2); // Scale

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.1; x <= 20; x += 0.2) {
      points.push({
        WaitTime: Number(x.toFixed(1)),
        Density: jStat.gamma.pdf(x, k, theta)
      });
    }
    return points;
  }, [k, theta]);

  return (
    <div style={{ padding: '1.5rem', border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Gamma Distribution</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Shape (k): {k}</label>
          <input 
            type="range" className="modern-slider" min="1" max="10" step="0.5" 
            value={k} onChange={(e) => setK(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>Number of events to wait for</small>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Scale (θ): {theta}</label>
          <input 
            type="range" className="modern-slider" min="0.5" max="5" step="0.5" 
            value={theta} onChange={(e) => setTheta(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>Mean time between events</small>
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="WaitTime" type="number" domain={[0, 20]} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Density" stroke="#64748b" fill="#64748b" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}