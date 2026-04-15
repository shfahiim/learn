import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';

const LogisticRegressionViz = () => {
  const [w, setW] = useState(1.0);
  const [b, setB] = useState(0.0);

  const data = useMemo(() => {
    const results = [];
    for (let x = -10; x <= 10; x += 0.5) {
      // z = w*x + b
      const z = w * x + b;
      // Sigmoid function: p = 1 / (1 + exp(-z))
      const p = 1 / (1 + Math.exp(-z));
      results.push({ x, p, z });
    }
    return results;
  }, [w, b]);

  return (
    <div className="my-8">
      <ChartCard 
        title="Interactive Logistic Sigmoid" 
        subtitle="Adjust the weight and bias to see how the decision boundary (p=0.5) shifts and how the 'certainty' of the model changes."
      >
        <ChartControls>
          <ChartControl label="Weight (w)" value={w.toFixed(1)} hint="Controls the steepness (certainty)">
            <input
              type="range"
              className="modern-slider"
              min="-5"
              max="5"
              step="0.1"
              value={w}
              onChange={(e) => setW(parseFloat(e.target.value))}
            />
          </ChartControl>
          <ChartControl label="Bias (b)" value={b.toFixed(1)} hint="Shifts the curve left/right">
            <input
              type="range"
              className="modern-slider"
              min="-10"
              max="10"
              step="0.5"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
            />
          </ChartControl>
        </ChartControls>

        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <defs>
                <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="x" {...chartAxisProps} label={{ value: 'Input Feature (x)', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={[0, 1]} {...chartAxisProps} label={{ value: 'Probability (p)', angle: -90, position: 'insideLeft' }} />
              <Tooltip {...chartTooltipProps} />
              <ReferenceLine y={0.5} stroke="var(--chart-secondary)" strokeDasharray="3 3" label="Decision Threshold (0.5)" />
              <ReferenceLine x={-b/w} stroke="var(--chart-accent)" strokeDasharray="3 3" label="Boundary" />
              <Area 
                type="monotone" 
                dataKey="p" 
                stroke="var(--chart-primary)" 
                fill="url(#colorP)" 
                strokeWidth={3}
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default LogisticRegressionViz;
