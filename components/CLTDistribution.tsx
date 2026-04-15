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

function lcg(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function CLTDistribution() {
  const [sampleSize, setSampleSize] = useState(2);
  const [numDraws, setNumDraws] = useState(100);
  const gradientId = useId();

  const data = useMemo(() => {
    const means = [];
    const rng = lcg(42);

    for (let i = 0; i < numDraws; i++) {
      let sum = 0;
      for (let j = 0; j < sampleSize; j++) {
        sum += rng();
      }
      means.push(sum / sampleSize);
    }

    const bins = new Array(20).fill(0);
    means.forEach((mean) => {
      const binIndex = Math.min(19, Math.floor(mean * 20));
      bins[binIndex]++;
    });

    return bins.map((count, i) => ({
      range: `${(i * 0.05).toFixed(2)}–${((i + 1) * 0.05).toFixed(2)}`,
      Count: count,
    }));
  }, [sampleSize, numDraws]);

  return (
    <ChartCard
      title="Central Limit Theorem"
      subtitle="Sampling from Uniform(0,1): as n increases, the distribution of means becomes normal-like."
    >
      <ChartControls>
        <ChartControl label="Sample Size (n)" value={sampleSize}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="50"
            step="1"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Samples Drawn" value={numDraws}>
          <input
            type="range"
            className="modern-slider"
            min="10"
            max="5000"
            step="10"
            value={numDraws}
            onChange={(e) => setNumDraws(parseInt(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 28 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.95} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.55} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis
              dataKey="range"
              interval={2}
              tick={{ ...chartAxisProps.tick, fontSize: 11 }}
              axisLine={chartAxisProps.axisLine}
              tickLine={chartAxisProps.tickLine}
            />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />
            <Bar dataKey="Count" fill={`url(#${gradientId})`} radius={[10, 10, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}