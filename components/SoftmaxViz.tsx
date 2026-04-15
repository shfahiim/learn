import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';

const SoftmaxViz = () => {
  const [temperature, setTemperature] = useState(1.0);
  const [logits, setLogits] = useState([2.0, 1.0, 0.5, 3.0]);

  const data = useMemo(() => {
    const expValues = logits.map(v => Math.exp(v / temperature));
    const sumExp = expValues.reduce((a, b) => a + b, 0);
    return logits.map((v, i) => ({
      name: `Class ${i + 1}`,
      logit: v,
      prob: expValues[i] / sumExp
    }));
  }, [logits, temperature]);

  return (
    <div className="my-8">
      <ChartCard title="Softmax Probabilities and Temperature" subtitle="The Softmax function converts raw scores (logits) into a probability distribution. Temperature (T) controls how 'sharp' or 'smooth' the distribution is.">
        <ChartControls>
          <ChartControl label="Temperature (T)" value={temperature.toFixed(1)} hint="High T = Smooth, Low T = Sharp">
            <input
              type="range"
              className="modern-slider"
              min="0.1"
              max="5"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </ChartControl>
        </ChartControls>

        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} vertical={false} />
              <XAxis dataKey="name" {...chartAxisProps} />
              <YAxis domain={[0, 1]} {...chartAxisProps} label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
              <Tooltip {...chartTooltipProps} />
              <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? 'var(--chart-primary)' : 'var(--chart-muted)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default SoftmaxViz;
