import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jStat } from 'jstat';

export function BetaDistributionViz() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(2);

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 1; x += 0.01) {
      let safeX = x;
      if (safeX === 0) safeX = 0.001;
      if (safeX === 1) safeX = 0.999;
      
      points.push({
        Probability: Number(x.toFixed(2)),
        Belief: jStat.beta.pdf(safeX, alpha, beta)
      });
    }
    return points;
  }, [alpha, beta]);

  return (
    <div style={{ padding: '1.5rem', border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Beta Distribution (Bayesian Prior)</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Alpha (α): {alpha}</label>
          <input 
            type="range" className="modern-slider" min="0.5" max="20" step="0.5" 
            value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>Prior "Successes"</small>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Beta (β): {beta}</label>
          <input 
            type="range" className="modern-slider" min="0.5" max="20" step="0.5" 
            value={beta} onChange={(e) => setBeta(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>Prior "Failures"</small>
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="Probability" type="number" domain={[0, 1]} tickCount={11} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Belief" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}