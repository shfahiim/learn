import React, { useId, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function PoissonDistribution() {
  const [lambda, setLambda] = useState(5);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    const maxK = Math.max(20, Math.ceil(lambda * 2.5));
    for (let k = 0; k <= maxK; k++) {
      points.push({
        k: k.toString(),
        Probability: jStat.poisson.pdf(k, lambda),
      });
    }
    return points;
  }, [lambda]);

  return (
    <ChartCard
      title="Poisson Distribution"
      subtitle="A count model for events in a fixed interval, with average rate λ."
    >
      <ChartControls>
        <ChartControl label="Average Rate (λ)" value={lambda}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="50"
            step="1"
            value={lambda}
            onChange={(e) => setLambda(parseInt(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.95} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.55} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="k" {...chartAxisProps} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />
            <Bar dataKey="Probability" fill={`url(#${gradientId})`} radius={[10, 10, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}