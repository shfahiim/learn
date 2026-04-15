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

export function GammaDistributionViz() {
  const [k, setK] = useState(2);
  const [theta, setTheta] = useState(2);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.1; x <= 20; x += 0.2) {
      points.push({
        WaitTime: Number(x.toFixed(1)),
        Density: jStat.gamma.pdf(x, k, theta),
      });
    }
    return points;
  }, [k, theta]);

  return (
    <ChartCard
      title="Gamma Distribution"
      subtitle="A flexible family for waiting times; controlled by shape k and scale θ."
    >
      <ChartControls>
        <ChartControl label="Shape (k)" value={k.toFixed(1)} hint="Number of events to wait for">
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="10"
            step="0.5"
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Scale (θ)" value={theta.toFixed(1)} hint="Mean time between events">
          <input
            type="range"
            className="modern-slider"
            min="0.5"
            max="5"
            step="0.5"
            value={theta}
            onChange={(e) => setTheta(parseFloat(e.target.value))}
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
            <XAxis dataKey="WaitTime" type="number" domain={[0, 20]} tickCount={11} {...chartAxisProps} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="Density"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}