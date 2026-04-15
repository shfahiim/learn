import React, { useMemo, useState } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function QQPlotViz() {
  const [skew, setSkew] = useState(0);

  const data = useMemo(() => {
    const points: { theo: number; sample: number; line: number }[] = [];
    for (let i = 1; i <= 50; i++) {
      const theoQuantile = (i - 25) / 10;
      let sampleQuantile = theoQuantile;
      if (skew > 0) sampleQuantile += Math.pow(Math.max(0, theoQuantile), 2) * (skew / 5);
      if (skew < 0) sampleQuantile -= Math.pow(Math.abs(Math.min(0, theoQuantile)), 2) * (Math.abs(skew) / 5);

      points.push({
        theo: Number(theoQuantile.toFixed(2)),
        sample: Number(sampleQuantile.toFixed(2)),
        line: Number(theoQuantile.toFixed(2)),
      });
    }
    return points;
  }, [skew]);

  const skewLabel = skew === 0 ? 'Normal' : skew > 0 ? 'Right skew' : 'Left skew';

  return (
    <ChartCard title="Q-Q plot" subtitle="Compare sample quantiles to theoretical normal quantiles. Deviations from the red line signal non-normality.">
      <ChartControls>
        <ChartControl label="Skewness" value={skewLabel} hint="Move away from 0 to create curvature in the Q-Q plot.">
          <input
            type="range"
            className="modern-slider"
            min={-5}
            max={5}
            step={0.5}
            value={skew}
            onChange={(e) => setSkew(parseFloat(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
            <CartesianGrid {...chartGridProps} />
            <XAxis
              {...chartAxisProps}
              type="number"
              dataKey="theo"
              name="Theoretical"
              domain={[-3, 3]}
              tickCount={7}
            />
            <YAxis
              {...chartAxisProps}
              type="number"
              dataKey="sample"
              name="Sample"
              domain={[-5, 5]}
              tickCount={7}
            />
            <Tooltip {...chartTooltipProps} />
            <Scatter name="Data" dataKey="sample" fill="var(--chart-primary)" />
            <Line type="linear" dataKey="line" stroke="var(--chart-danger)" dot={false} strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
