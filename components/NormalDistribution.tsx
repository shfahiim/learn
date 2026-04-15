import React, { useMemo, useId, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function NormalDistribution() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        y: jStat.normal.pdf(x, mean, stdDev),
      });
    }
    return points;
  }, [mean, stdDev]);

  return (
    <ChartCard
      title="Normal Distribution"
      subtitle="Drag μ and σ to shift the curve and change its spread."
    >
      <ChartControls>
        <ChartControl label="Mean (μ)" value={mean.toFixed(1)}>
          <input
            type="range"
            className="modern-slider"
            min="-3"
            max="3"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Standard Deviation (σ)" value={stdDev.toFixed(1)}>
          <input
            type="range"
            className="modern-slider"
            min="0.1"
            max="3"
            step="0.1"
            value={stdDev}
            onChange={(e) => setStdDev(parseFloat(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.35} />
                <stop offset="75%" stopColor="var(--chart-primary)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis
              dataKey="x"
              type="number"
              domain={[-5, 5]}
              tickCount={9}
              {...chartAxisProps}
            />
            <YAxis domain={[0, 1]} {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="y"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 3 }}
            />
            <ReferenceLine
              x={mean}
              stroke="var(--chart-danger)"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}