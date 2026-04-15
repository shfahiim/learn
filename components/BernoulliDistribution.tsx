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
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function BernoulliDistribution() {
  const [p, setP] = useState(0.5);
  const gradientId = useId();

  const data = useMemo(() => {
    return [
      { outcome: 'Failure (0)', Probability: 1 - p },
      { outcome: 'Success (1)', Probability: p },
    ];
  }, [p]);

  return (
    <ChartCard
      title="Bernoulli Distribution"
      subtitle="A single trial: success with probability p, failure with probability 1−p."
    >
      <ChartControls>
        <ChartControl label="Probability of Success (p)" value={p.toFixed(2)}>
          <input
            type="range"
            className="modern-slider"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(parseFloat(e.target.value))}
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
            <XAxis dataKey="outcome" {...chartAxisProps} />
            <YAxis domain={[0, 1]} {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />
            <Bar dataKey="Probability" fill={`url(#${gradientId})`} radius={[10, 10, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}