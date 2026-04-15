import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { jStat } from 'jstat';

export function ZScoreViz() {
  const [zScore, setZScore] = useState(1);
  const [direction, setDirection] = useState<'less' | 'greater'>('less');

  const data = useMemo(() => {
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.normal.pdf(x, 0, 1)
      });
    }
    return points;
  }, []);

  const probability = useMemo(() => {
    const p = jStat.normal.cdf(zScore, 0, 1);
    return direction === 'less' ? p : 1 - p;
  }, [zScore, direction]);

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Z-Score Probability</h3>
      
      <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '1.5rem', backgroundColor: 'var(--chart-bg)', borderRadius: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '1.1rem', color: 'inherit' }}>
          Probability $P(Z {direction === 'less' ? '<' : '>'} {zScore}) =$ <strong style={{ fontSize: '1.4rem', color: '#a21caf' }}>{(probability * 100).toFixed(2)}%</strong>
        </p>
      </div>

      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Z-Score (z): {zScore}</label>
          <input 
            type="range" className="modern-slider" min="-3.5" max="3.5" step="0.1" 
            value={zScore} onChange={(e) => setZScore(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div className="chart-wrapper" style={{ flex: '1 1 200px', display: 'flex', alignItems: 'flex-end' }}>
             <select 
                value={direction} 
                onChange={(e) => setDirection(e.target.value as 'less' | 'greater')}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--chart-border)', backgroundColor: 'white', color: 'inherit', fontWeight: 'bold' }}
            >
                <option value="less">Area to the Left (Less Than)</option>
                <option value="greater">Area to the Right (Greater Than)</option>
            </select>
        </div>
      </div>

      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[-4, 4]} tickCount={9} />
            <YAxis />
            <Tooltip />
            <ReferenceArea 
                x1={direction === 'less' ? -4 : zScore} 
                x2={direction === 'less' ? zScore : 4} 
                fill="var(--chart-primary)" fillOpacity={0.7} 
            />
            <Area type="monotone" dataKey="Density" stroke="var(--chart-primary)" fill="none" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}