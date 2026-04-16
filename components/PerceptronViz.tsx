import React, { useState, useMemo, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Line, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const PerceptronViz = () => {
  const [w, setW] = useState([0.2, 0.8]);
  const [b, setB] = useState(-0.5);
  const [step, setStep] = useState(0);

  // Hardcoded linearly separable data
  const points = useMemo(() => [
    { x: 1, y: 3, label: 1 },
    { x: 2, y: 5, label: 1 },
    { x: 4, y: 7, label: 1 },
    { x: 2, y: 1, label: -1 },
    { x: 5, y: 3, label: -1 },
    { x: 6, y: 5, label: -1 },
  ], []);

  const misclassified = useMemo(() => {
    return points.find(p => {
      const pred = Math.sign(w[0] * p.x + w[1] * p.y + b);
      return pred !== p.label;
    });
  }, [w, b, points]);

  const trainStep = () => {
    if (!misclassified) return;
    const lr = 0.2;
    setW([w[0] + lr * misclassified.label * misclassified.x, w[1] + lr * misclassified.label * misclassified.y]);
    setB(b + lr * misclassified.label);
    setStep(s => s + 1);
  };

  const lineData = useMemo(() => {
    // Decision boundary: w0*x + w1*y + b = 0 => y = (-w0*x - b) / w1
    const xRange = [0, 8];
    return xRange.map(x => ({
      x,
      y: (-w[0] * x - b) / w[1]
    }));
  }, [w, b]);

  return (
    <div className="my-8">
      <ChartCard 
        title="Perceptron Learning (Step-by-Step)" 
        subtitle="Watch the hyperplane shift to correct its mistakes. Each 'Train' click identifies a misclassified point and rotates the boundary."
      >
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <button 
            onClick={trainStep}
            disabled={!misclassified}
            className={`chart-button ${!misclassified ? 'opacity-40 cursor-not-allowed' : ''}`}
            style={misclassified ? { background: 'var(--chart-primary)', color: '#fff', border: 'none' } : {}}
          >
            {misclassified ? `Next Train Step (${step})` : 'Convergence Reached! 🎉'}
          </button>
          <div className="text-sm">
            Current weights: <code style={{ background: 'var(--surface-3)', padding: '2px 6px', borderRadius: '4px' }}>w:[{w[0].toFixed(2)}, {w[1].toFixed(2)}]</code>{' '}
            bias: <code style={{ background: 'var(--surface-3)', padding: '2px 6px', borderRadius: '4px' }}>{b.toFixed(2)}</code>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" domain={[0, 8]} {...chartAxisProps} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} cursor={{ strokeDasharray: '3 3' }} />
              
              <Scatter name="Data" data={points}>
                {points.map((p, i) => (
                  <Cell 
                    key={`cell-${i}`} 
                    fill={p.label === 1 ? 'var(--chart-danger)' : 'var(--chart-primary)'}
                    stroke={misclassified === p ? 'var(--chart-axis)' : 'none'}
                    strokeWidth={3}
                  />
                ))}
              </Scatter>
              
              <Line 
                data={lineData} 
                type="linear" 
                dataKey="y" 
                stroke="var(--chart-success)" 
                strokeWidth={4} 
                dot={false}
                animationDuration={300}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {misclassified && (
          <div className="mt-4 p-3 rounded text-sm" style={{ background: 'var(--surface-3)', border: '1px solid var(--chart-border)', color: 'var(--chart-secondary)' }}>
            <strong>Misclassification detected!</strong> The model sees the {misclassified.label === 1 ? 'Red' : 'Blue'} point at ({misclassified.x}, {misclassified.y}) and will update the boundary.
          </div>
        )}
      </ChartCard>
    </div>
  );
};

export default PerceptronViz;
