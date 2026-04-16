import React, { useMemo } from 'react';
import { Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Line, ComposedChart } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';
import { Zap, Activity } from 'lucide-react';

const LDAVsQDAViz = () => {
  const data = useMemo(() => {
    const points = [];
    // Class 1: Circular (Lower Left)
    for (let i = 0; i < 40; i++) {
      const r = Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      points.push({ x: 3 + r * Math.cos(theta), y: 3 + r * Math.sin(theta), class: 1 });
    }
    // Class 2: Elliptical (Upper Right, Different Covariance)
    for (let i = 0; i < 40; i++) {
      const x = 7 + (Math.random() - 0.5) * 6;
      const y = 7 + (Math.random() - 0.5) * 1.5;
      points.push({ x, y: y + (x - 7) * 0.2, class: 2 });
    }
    return points;
  }, []);

  // Generate boundary points
  const ldaBoundary = useMemo(() => {
    return [
      { x: 1, y: 1 },
      { x: 9, y: 9 }
    ];
  }, []);

  const qdaBoundary = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 10; x += 0.5) {
      // Quadratic curve: y = a(x-h)^2 + k
      const y = 0.1 * Math.pow(x - 5, 2) + 2;
      points.push({ x, y });
    }
    return points;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
        <ChartCard 
          title={
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Linear (LDA)</span>
            </div>
          } 
          subtitle="Assumes shared covariance. Resulting boundary is a straight line."
        >
          <div className="chart-canvas w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid {...chartGridProps} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0, 10]} {...chartAxisProps} name="Feature 1" />
                <YAxis type="number" dataKey="y" domain={[0, 10]} {...chartAxisProps} name="Feature 2" />
                <Tooltip {...chartTooltipProps} cursor={{ strokeDasharray: '3 3' }} />
                
                {/* Decision Boundary */}
                <Line 
                  data={ldaBoundary} 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  strokeDasharray="8 8" 
                  dot={false} 
                  activeDot={false}
                  isAnimationActive={false}
                />
                
                <Scatter name="Class 1" data={data.filter(d => d.class === 1)}>
                  {data.filter(d => d.class === 1).map((entry, index) => (
                    <Cell key={`c1-${index}`} fill="#6366f1" stroke="#4338ca" strokeWidth={1} />
                  ))}
                </Scatter>
                <Scatter name="Class 2" data={data.filter(d => d.class === 2)}>
                  {data.filter(d => d.class === 2).map((entry, index) => (
                    <Cell key={`c2-${index}`} fill="#10b981" stroke="#047857" strokeWidth={1} />
                  ))}
                </Scatter>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
        <ChartCard 
          title={
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Quadratic (QDA)</span>
            </div>
          } 
          subtitle="Allows unique covariance per class. Resulting boundary is a curve."
        >
          <div className="chart-canvas w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid {...chartGridProps} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0, 10]} {...chartAxisProps} name="Feature 1" />
                <YAxis type="number" dataKey="y" domain={[0, 10]} {...chartAxisProps} name="Feature 2" />
                <Tooltip {...chartTooltipProps} cursor={{ strokeDasharray: '3 3' }} />
                
                {/* Decision Boundary */}
                <Line 
                  data={qdaBoundary} 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  strokeDasharray="8 8" 
                  dot={false} 
                  activeDot={false}
                  isAnimationActive={false}
                />
                
                <Scatter name="Class 1" data={data.filter(d => d.class === 1)}>
                  {data.filter(d => d.class === 1).map((entry, index) => (
                    <Cell key={`c1-${index}`} fill="#6366f1" stroke="#4338ca" strokeWidth={1} />
                  ))}
                </Scatter>
                <Scatter name="Class 2" data={data.filter(d => d.class === 2)}>
                  {data.filter(d => d.class === 2).map((entry, index) => (
                    <Cell key={`c2-${index}`} fill="#10b981" stroke="#047857" strokeWidth={1} />
                  ))}
                </Scatter>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default LDAVsQDAViz;
