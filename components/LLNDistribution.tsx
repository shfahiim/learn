import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function LLNDistribution() {
  const [flips, setFlips] = useState(0);
  const [runningAvg, setRunningAvg] = useState(0);
  const [history, setHistory] = useState<{ x: number; Average: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const expectedValue = 0.5;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && flips < 1000) {
      interval = setInterval(() => {
        const newFlip = Math.random() < 0.5 ? 1 : 0;
        setFlips((prev) => {
          const nextFlips = prev + 1;
          setRunningAvg((prevAvg) => {
            const nextAvg = (prevAvg * prev + newFlip) / nextFlips;
            setHistory((h) => [...h, { x: nextFlips, Average: nextAvg }]);
            return nextAvg;
          });
          return nextFlips;
        });
      }, 50);
    } else if (flips >= 1000) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, flips]);

  const reset = () => {
    setFlips(0);
    setRunningAvg(0);
    setHistory([]);
    setIsPlaying(false);
  };

  return (
    <ChartCard title="Law of large numbers" subtitle="Flip a fair coin and watch the running average converge to 0.5.">
      <div className="chart-kpi">
        <div className="chart-kpi-muted">Expected value</div>
        <div className="chart-kpi-value">0.5</div>
        <div className="chart-kpi-muted">
          Running average after <span style={{ fontWeight: 750 }}>{flips}</span> flips:{' '}
          <span style={{ fontWeight: 750 }}>{runningAvg.toFixed(4)}</span>
        </div>
      </div>

      <div className="chart-button-row">
        <button
          type="button"
          className="chart-button chart-button-primary"
          data-active={isPlaying}
          onClick={() => setIsPlaying((v) => !v)}
        >
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button type="button" className="chart-button" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid {...chartGridProps} />
            <XAxis {...chartAxisProps} dataKey="x" type="number" domain={[0, 1000]} tickCount={6} />
            <YAxis {...chartAxisProps} domain={[0, 1]} tickCount={6} />
            <Tooltip {...chartTooltipProps} />
            <Line
              type="stepAfter"
              dataKey="Average"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceLine y={expectedValue} stroke="var(--chart-danger)" strokeDasharray="4 4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
