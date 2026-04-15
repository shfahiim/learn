import React, { useMemo, useState } from 'react';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function CorrelationViz() {
  const [correlation, setCorrelation] = useState(0.8);
  const [hetero, setHetero] = useState(false);

  const data = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 10 - 5;
      let noise = Math.random() * 4 - 2;

      if (hetero) {
        noise = noise * Math.abs(x);
      }

      const y = correlation * x + (1 - Math.abs(correlation)) * noise * 3;
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
    }
    return points;
  }, [correlation, hetero]);

  return (
    <ChartCard
      title="Correlation scatter plot"
      subtitle="Adjust r and see how the cloud tightens/loosens. Toggle heteroscedasticity for cone-shaped variance."
    >
      <ChartControls>
        <ChartControl label="Correlation (r)" value={correlation.toFixed(2)} hint="-1 is perfect negative, +1 is perfect positive.">
          <input
            type="range"
            className="modern-slider"
            min={-1}
            max={1}
            step={0.1}
            value={correlation}
            onChange={(e) => setCorrelation(parseFloat(e.target.value))}
          />
        </ChartControl>

        <ChartControl label="Heteroscedasticity" value={hetero ? 'On' : 'Off'} hint="Variance increases with |x| (cone shape).">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 650 }}>
            <input className="chart-checkbox" type="checkbox" checked={hetero} onChange={(e) => setHetero(e.target.checked)} />
            Enable heteroscedasticity
          </label>
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
            <CartesianGrid {...chartGridProps} />
            <XAxis
              {...chartAxisProps}
              type="number"
              dataKey="x"
              name="X"
              domain={[-5, 5]}
              tickCount={7}
            />
            <YAxis
              {...chartAxisProps}
              type="number"
              dataKey="y"
              name="Y"
              domain={[-10, 10]}
              tickCount={7}
            />
            <Tooltip {...chartTooltipProps} />
            <Scatter name="Points" data={data} fill="var(--chart-primary)" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
