import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const KernelTrickViz = () => {
  const data = useMemo(() => {
    const points = [];
    // Class 1: Inner circle
    for (let i = 0; i < 30; i++) {
      const r = Math.random() * 3;
      const theta = Math.random() * 2 * Math.PI;
      points.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), z: r*r, class: 'Class 1', color: '#8884d8' });
    }
    // Class 2: Outer ring
    for (let i = 0; i < 30; i++) {
      const r = Math.random() * 3 + 5;
      const theta = Math.random() * 2 * Math.PI;
      points.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), z: r*r, class: 'Class 2', color: '#82ca9d' });
    }
    return points;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <ChartCard title="Original Space (2D)" subtitle="Data is not linearly separable. We cannot draw a straight line between the inner circle and outer ring.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data}>
                {data.map((entry, index) => (
                  <circle key={`cell-${index}`} cx={0} cy={0} r={4} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Feature Space (with z = x² + y²)" subtitle="By mapping the data to a higher dimension (z), the classes become linearly separable by a horizontal plane.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="z" name="z (Mapped)" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data}>
                {data.map((entry, index) => (
                  <circle key={`cell-${index}`} cx={0} cy={0} r={4} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default KernelTrickViz;
