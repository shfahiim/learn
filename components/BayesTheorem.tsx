import React, { useMemo, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartTooltipProps } from './charts/rechartsDefaults';

export function BayesTheorem() {
  const [priorPos, setPriorPos] = useState(1);
  const [tpr, setTpr] = useState(90);
  const [fpr, setFpr] = useState(9);

  const model = useMemo(() => {
    const P_A = priorPos / 100;
    const P_notA = 1 - P_A;

    const P_B_given_A = tpr / 100;
    const P_B_given_notA = fpr / 100;

    const P_B = P_B_given_A * P_A + P_B_given_notA * P_notA;
    const posterior = (P_B_given_A * P_A) / P_B;

    return {
      posteriorPct: posterior * 100,
      positiveTestRatePct: P_B * 100,
      chartData: [
        { name: 'True positives', value: P_B_given_A * P_A },
        { name: 'False positives', value: P_B_given_notA * P_notA },
      ],
    };
  }, [priorPos, tpr, fpr]);

  const COLORS = ['var(--chart-success)', 'var(--chart-danger)'];

  return (
    <ChartCard
      title="Bayes’ theorem (medical testing)"
      subtitle="If you test positive, what’s the chance you actually have the disease?"
    >
      <div className="chart-kpi">
        <div className="chart-kpi-muted">Positive predictive value</div>
        <div className="chart-kpi-value" style={{ color: 'var(--chart-success)' }}>
          {model.posteriorPct.toFixed(1)}%
        </div>
        <div className="chart-kpi-muted">Positive test rate: {model.positiveTestRatePct.toFixed(2)}% of the population</div>
      </div>

      <ChartControls>
        <ChartControl label="Disease prevalence" value={`${priorPos.toFixed(1)}%`} hint="Base rate in the population.">
          <input
            type="range"
            className="modern-slider"
            min={0.1}
            max={10}
            step={0.1}
            value={priorPos}
            onChange={(e) => setPriorPos(parseFloat(e.target.value))}
          />
        </ChartControl>

        <ChartControl label="Sensitivity" value={`${tpr}%`} hint="If sick, chance of a positive test.">
          <input
            type="range"
            className="modern-slider"
            min={50}
            max={100}
            step={1}
            value={tpr}
            onChange={(e) => setTpr(parseInt(e.target.value, 10))}
            style={{ ['--slider-accent' as any]: 'var(--chart-success)' } as React.CSSProperties}
          />
        </ChartControl>

        <ChartControl label="False positive rate" value={`${fpr}%`} hint="If healthy, chance of an incorrect positive.">
          <input
            type="range"
            className="modern-slider"
            min={0}
            max={20}
            step={1}
            value={fpr}
            onChange={(e) => setFpr(parseInt(e.target.value, 10))}
            style={{ ['--slider-accent' as any]: 'var(--chart-danger)' } as React.CSSProperties}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={model.chartData}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              stroke="var(--chart-border)"
              strokeWidth={1}
            >
              {model.chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...chartTooltipProps} formatter={(val: any) => `${(Number(val) * 100).toFixed(4)}% of population`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
