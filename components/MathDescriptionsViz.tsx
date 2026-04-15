import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { jStat } from 'jstat';

export function MathDescriptionsViz() {
  const [view, setView] = useState<'PDF' | 'CDF'>('PDF');
  const [bound, setBound] = useState(0);

  const data = useMemo(() => {
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Value: view === 'PDF' ? jStat.normal.pdf(x, 0, 1) : jStat.normal.cdf(x, 0, 1),
      });
    }
    return points;
  }, [view]);

  const probability = useMemo(() => {
    return jStat.normal.cdf(bound, 0, 1);
  }, [bound]);

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>
        Interactive: {view === 'PDF' ? 'Probability Density (PDF)' : 'Cumulative Distribution (CDF)'}
      </h3>
      
      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setView('PDF')}
          style={{ padding: '0.5rem 1rem', background: view === 'PDF' ? '#0ea5e9' : '#e0f2fe', color: view === 'PDF' ? 'white' : '#0369a1', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Show PDF
        </button>
        <button 
          onClick={() => setView('CDF')}
          style={{ padding: '0.5rem 1rem', background: view === 'CDF' ? '#0ea5e9' : '#e0f2fe', color: view === 'CDF' ? 'white' : '#0369a1', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Show CDF
        </button>
      </div>

      <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '1.5rem', backgroundColor: 'var(--chart-bg)', borderRadius: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '1.1rem', color: 'inherit' }}>
          Probability $P(X \le {bound}) =$ <strong style={{ fontSize: '1.3rem', color: '#0284c7' }}>{(probability * 100).toFixed(2)}%</strong>
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'inherit' }}>
          {view === 'PDF' 
            ? "In a PDF, probability is the AREA UNDER THE CURVE (shaded in blue)." 
            : "In a CDF, probability is simply the Y-AXIS VALUE at that point."}
        </p>
      </div>

      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <div className="chart-wrapper" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Drag Upper Bound (x): {bound}</label>
          <input 
            type="range" className="modern-slider" min="-4" max="4" step="0.1" 
            value={bound} onChange={(e) => setBound(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[-4, 4]} />
            <YAxis domain={[0, view === 'PDF' ? 0.45 : 1.1]} />
            <Tooltip />
            {view === 'PDF' && (
              <ReferenceArea x1={-4} x2={bound} fill="var(--chart-primary)" fillOpacity={0.7} />
            )}
            <Area type="monotone" dataKey="Value" stroke="var(--chart-primary)" fill={view === 'CDF' ? '#bae6fd' : 'none'} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}