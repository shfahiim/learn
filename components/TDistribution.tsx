import React, { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function TDistribution() {
  const [df, setDf] = useState(1);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        't-Distribution': jStat.studentt.pdf(x, df),
        'Normal (Reference)': jStat.normal.pdf(x, 0, 1),
      });
    }
    return points;
  }, [df]);

  return (
    <ChartCard
      title="Student’s t-Distribution"
      subtitle="As df increases, it approaches the normal distribution."
    >
      <ChartControls>
        <ChartControl label="Degrees of Freedom (df)" value={df}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="30"
            step="1"
            value={df}
            onChange={(e) => setDf(parseInt(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.32} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" type="number" domain={[-5, 5]} tickCount={9} {...chartAxisProps} />
            <YAxis domain={[0, 0.45]} {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="t-Distribution"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="Normal (Reference)"
              stroke="var(--chart-muted)"
              fill="none"
              strokeDasharray="5 4"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}