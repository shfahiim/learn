import React, { useMemo } from 'react';
import { ComposedChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const SVMViz = () => {
  const data = useMemo(() => {
    const classA = Array.from({ length: 15 }, (_, i) => ({ x: i + 1, y: i + 1.5 + Math.random() * 2, class: 'A', color: '#8884d8' }));
    const classB = Array.from({ length: 15 }, (_, i) => ({ x: i + 4, y: i + 0.5 + Math.random() * 2, class: 'B', color: '#82ca9d' }));
    return [...classA, ...classB];
  }, []);

  const decisionBoundary = [{ x: 0, y: 0.5 }, { x: 10, y: 10.5 }];
  const marginUpper = [{ x: 0, y: 1.5 }, { x: 9, y: 10.5 }];
  const marginLower = [{ x: 1, y: 0.5 }, { x: 10, y: 9.5 }];

  return (
    <div className="my-8">
      <ChartCard title="Support Vector Machine (Maximum Margin)" subtitle="The SVM finds the decision boundary (solid line) that maximizes the 'margin' (distance to the nearest data points, called support vectors). Shaded areas represent the margin.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Class A" data={data.filter((d) => d.class === 'A')} fill="#8884d8" />
              <Scatter name="Class B" data={data.filter((d) => d.class === 'B')} fill="#82ca9d" />
              <Line data={decisionBoundary} type="linear" dataKey="y" stroke="#ef4444" strokeWidth={3} dot={false} />
              <Line data={marginUpper} type="linear" dataKey="y" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} />
              <Line data={marginLower} type="linear" dataKey="y" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default SVMViz;
