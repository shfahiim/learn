import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function FDistributionViz() {
  const [d1, setD1] = useState(5);
  const [d2, setD2] = useState(10);

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.05; x <= 5; x += 0.05) {
      points.push({
        x: Number(x.toFixed(2)),
        Density: jStat.centralF.pdf(x, d1, d2)
      });
    }
    return points;
  }, [d1, d2]);

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: '#fff7ed' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#9a3412' }}>Interactive F-Distribution (ANOVA)</h3>
      
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#ffedd5', borderRadius: '0.5rem' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', color: '#c2410c' }}>
              Notice how the shape changes purely based on the ratio of the two Degrees of Freedom!
          </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#7c2d12' }}>Numerator DF (d₁): {d1}</label>
          <input 
            type="range" min="1" max="50" step="1" 
            value={d1} onChange={(e) => setD1(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#ea580c' }}
          />
          <small style={{ color: '#9a3412' }}>Between-group variance</small>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#7c2d12' }}>Denominator DF (d₂): {d2}</label>
          <input 
            type="range" min="1" max="50" step="1" 
            value={d2} onChange={(e) => setD2(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#ea580c' }}
          />
          <small style={{ color: '#9a3412' }}>Within-group variance (Error)</small>
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 5]} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Density" stroke="#ea580c" fill="#ea580c" fillOpacity={0.2} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}