import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const HistoryAccuracyViz = () => {
  const data = useMemo(() => {
    const points = [];
    for (let m = 0; m <= 100; m += 5) {
      // Traditional Algorithms: Plateaus early (e.g., Logistic Regression, SVM)
      const traditional = 10 + 70 * (1 - Math.exp(-m / 20));
      
      // Neural Networks: Keeps scaling with more data and compute
      const neural = 5 + 90 * (1 - Math.exp(-m / 45));
      
      points.push({
        m,
        traditional: parseFloat(traditional.toFixed(1)),
        neural: parseFloat(neural.toFixed(1)),
      });
    }
    return points;
  }, []);

  return (
    <div className="my-8">
      <ChartCard 
        title="Performance vs. Data Size" 
        subtitle="Illustrating why Deep Learning (Neural Networks) became dominant as data volume exploded."
      >
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis 
                dataKey="m" 
                label={{ value: 'Amount of Data', position: 'insideBottom', offset: -10 }} 
                {...chartAxisProps} 
                tick={false}
              />
              <YAxis 
                label={{ value: 'Accuracy / Performance', angle: -90, position: 'insideLeft' }} 
                {...chartAxisProps} 
                tick={false}
              />
              <Tooltip {...chartTooltipProps} />
              <Legend verticalAlign="top" height={36}/>
              
              <Line 
                name="Traditional Algorithms (SVM, DT, etc.)" 
                type="monotone" 
                dataKey="traditional" 
                stroke="var(--chart-muted)" 
                strokeWidth={3} 
                dot={false}
                strokeDasharray="5 5"
              />
              <Line 
                name="Deep Learning (Neural Networks)" 
                type="monotone" 
                dataKey="neural" 
                stroke="var(--chart-primary)" 
                strokeWidth={4} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 rounded-md text-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-1)', color: 'inherit' }}>
          <p>
            <strong>Key Insight:</strong> Traditional algorithms tend to plateau in performance once they reach their capacity to represent complexity. In contrast, <strong>Neural Networks</strong> (especially deep ones) continue to improve as they are fed more data, leveraging modern computing power.
          </p>
        </div>
      </ChartCard>
    </div>
  );
};

export default HistoryAccuracyViz;
