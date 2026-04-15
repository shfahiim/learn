import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { jStat } from 'jstat';

export function SkewnessViz() {
  const [shape, setShape] = useState(2); // Alpha parameter for Beta distribution to control skew

  const data = useMemo(() => {
    const points = [];
    const alpha = shape;
    const betaParam = 10 - shape; // Keeps the total "weight" constant, just shifts it
    
    for (let x = 0; x <= 1; x += 0.01) {
      // Avoid infinities at the edges of beta
      let safeX = x;
      if (safeX === 0) safeX = 0.001;
      if (safeX === 1) safeX = 0.999;
      
      points.push({
        x: Number(x.toFixed(2)),
        Density: jStat.beta.pdf(safeX, alpha, betaParam)
      });
    }
    
    const mean = alpha / (alpha + betaParam);
    const median = (alpha - 1/3) / (alpha + betaParam - 2/3); // Approximation for Beta median
    
    return { points, mean, median, alpha, beta: betaParam };
  }, [shape]);

  const skewType = data.alpha > data.beta ? "Negative (Left) Skew" : data.alpha < data.beta ? "Positive (Right) Skew" : "Symmetrical (Zero Skew)";
  const color = data.alpha > data.beta ? "#ec4899" : data.alpha < data.beta ? "#10b981" : "#8b5cf6";

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Skewness: Mean vs Median</h3>
      
      <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '1.5rem', backgroundColor: 'var(--chart-bg)', borderRadius: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '1.2rem', color: color, fontWeight: 'bold' }}>
          {skewType}
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: 'inherit' }}>
          The <span style={{ color: '#ef4444', fontWeight: 'bold'}}>Mean ({data.mean.toFixed(2)})</span> is always pulled further into the tail than the <span style={{ color: '#3b82f6', fontWeight: 'bold'}}>Median ({data.median.toFixed(2)})</span>!
        </p>
      </div>

      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div className="chart-wrapper" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit', textAlign: 'center' }}>Drag to change Skewness</label>
          <input 
            type="range" className="modern-slider" min="1.5" max="8.5" step="0.1" 
            value={shape} onChange={(e) => setShape(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: color }}
          />
          <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'inherit' }}>
            <span>Right Skew</span>
            <span>Symmetrical</span>
            <span>Left Skew</span>
          </div>
        </div>
      </div>

      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.points} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 1]} tickCount={11} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Density" stroke={color} fill={color} fillOpacity={0.2} />
            <ReferenceLine x={data.mean} stroke="var(--chart-danger)" strokeWidth={2} label={{ value: 'Mean', position: 'top', fill: '#ef4444', fontSize: 12 }} />
            <ReferenceLine x={data.median} stroke="var(--chart-primary)" strokeDasharray="3 3" strokeWidth={2} label={{ value: 'Median', position: 'insideTopLeft', fill: '#3b82f6', fontSize: 12 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}