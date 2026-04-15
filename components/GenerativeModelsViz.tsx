import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const GenerativeModelsViz = () => {
  const data = useMemo(() => {
    const results = [];
    for (let x = -5; x <= 15; x += 0.2) {
      // Gaussian class-conditional p(x|C1) and p(x|C2)
      const p1 = (1 / Math.sqrt(2 * Math.PI * 1.5)) * Math.exp(-Math.pow(x - 2, 2) / (2 * 1.5));
      const p2 = (1 / Math.sqrt(2 * Math.PI * 2)) * Math.exp(-Math.pow(x - 8, 2) / (2 * 2));
      results.push({ x, p1, p2 });
    }
    return results;
  }, []);

  return (
    <div className="my-8">
      <ChartCard title="Class-Conditional Densities" subtitle="Generative models learn the distribution of each class independently, p(x | Ck). Bayes' rule is then used to compute the posterior p(Ck | x) for classification.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="x" {...chartAxisProps} />
              <YAxis {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Area type="monotone" name="Class 1: p(x | C1)" dataKey="p1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" name="Class 2: p(x | C2)" dataKey="p2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default GenerativeModelsViz;
