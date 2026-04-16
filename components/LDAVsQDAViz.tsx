import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const LDAVsQDAViz = () => {
  const data = useMemo(() => {
    const points = [];
    // Class 1: Circular
    for (let i = 0; i < 40; i++) {
      const r = Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      points.push({ x: 3 + r * Math.cos(theta), y: 3 + r * Math.sin(theta), class: 1 });
    }
    // Class 2: Elliptical (Different Covariance)
    for (let i = 0; i < 40; i++) {
      const x = 7 + (Math.random() - 0.5) * 6;
      const y = 7 + (Math.random() - 0.5) * 1;
      points.push({ x, y, class: 2 });
    }
    return points;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <ChartCard title="Linear (LDA)" subtitle="Assumes both classes share the same covariance. The resulting boundary is a straight line.">
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" domain={[0, 10]} {...chartAxisProps} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.class === 1 ? '#8884d8' : '#82ca9d'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          {/* SVG Overlay for Decision Boundary */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <line x1="20" y1="80" x2="80" y2="20" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          </svg>
        </div>
      </ChartCard>

      <ChartCard title="Quadratic (QDA)" subtitle="Allows each class to have its own covariance. The resulting boundary is a curve.">
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" domain={[0, 10]} {...chartAxisProps} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.class === 1 ? '#8884d8' : '#82ca9d'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          {/* SVG Overlay for Decision Boundary */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M 10 90 Q 50 50 90 85" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          </svg>
        </div>
      </ChartCard>
    </div>
  );
};

export default LDAVsQDAViz;
