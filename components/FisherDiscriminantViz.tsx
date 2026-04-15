import React, { useMemo } from 'react';
import { ComposedChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const FisherDiscriminantViz = () => {
  const dataA = useMemo(
    () => Array.from({ length: 20 }, () => ({ x: Math.random() * 4 + 1, y: Math.random() * 4 + 1 })),
    []
  );
  const dataB = useMemo(
    () => Array.from({ length: 20 }, () => ({ x: Math.random() * 4 + 5, y: Math.random() * 4 + 5 })),
    []
  );

  const fisherLine = useMemo(() => [{ x: 0, y: 0 }, { x: 10, y: 10 }], []);

  return (
    <div className="my-8">
      <ChartCard
        title="Fisher's Linear Discriminant"
        subtitle="Data points are projected onto a line (w) that maximizes class separation while minimizing within-class spread."
      >
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Class A" data={dataA} fill="#8884d8" />
              <Scatter name="Class B" data={dataB} fill="#82ca9d" />
              <Line data={fisherLine} type="linear" dataKey="y" stroke="#ef4444" strokeWidth={3} dot={false} strokeDasharray="5 5" />
              {dataA.slice(0, 5).map((p, i) => (
                <Line
                  key={`projA-${i}`}
                  data={[p, { x: (p.x + p.y) / 2, y: (p.x + p.y) / 2 }]}
                  type="linear"
                  dataKey="y"
                  stroke="#8884d8"
                  strokeOpacity={0.3}
                  dot={false}
                />
              ))}
              {dataB.slice(0, 5).map((p, i) => (
                <Line
                  key={`projB-${i}`}
                  data={[p, { x: (p.x + p.y) / 2, y: (p.x + p.y) / 2 }]}
                  type="linear"
                  dataKey="y"
                  stroke="#82ca9d"
                  strokeOpacity={0.3}
                  dot={false}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default FisherDiscriminantViz;
