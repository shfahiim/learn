import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const NaiveBayesViz = () => {
  const data = useMemo(() => {
    const results = [];
    for (let x = 0; x <= 10; x += 0.2) {
      // P(x | Spam) - Gaussian centered at 7
      const pSpam = (1 / Math.sqrt(2 * Math.PI * 1.0)) * Math.exp(-Math.pow(x - 7, 2) / (2 * 1.0));
      // P(x | Ham) - Gaussian centered at 3
      const pHam = (1 / Math.sqrt(2 * Math.PI * 1.5)) * Math.exp(-Math.pow(x - 3, 2) / (2 * 1.5));
      
      // Posteriors assuming P(Spam) = P(Ham) = 0.5
      const evidence = pSpam * 0.5 + pHam * 0.5;
      const postSpam = (pSpam * 0.5) / evidence;
      const postHam = (pHam * 0.5) / evidence;

      results.push({ x, pSpam, pHam, postSpam, postHam });
    }
    return results;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <ChartCard title="Class-Conditional Densities" subtitle="P(x | Class): The distribution of features for Spam vs Ham. Naive Bayes estimates these independently.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="x" {...chartAxisProps} />
              <YAxis {...chartAxisProps} hide />
              <Tooltip {...chartTooltipProps} />
              <Legend />
              <Area type="monotone" name="P(x | Spam)" dataKey="pSpam" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              <Area type="monotone" name="P(x | Ham)" dataKey="pHam" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Posterior Probabilities" subtitle="P(Class | x): The final probability used for classification, derived via Bayes' Theorem.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="x" {...chartAxisProps} />
              <YAxis domain={[0, 1]} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Legend />
              <Area type="monotone" name="P(Spam | x)" dataKey="postSpam" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              <Area type="monotone" name="P(Ham | x)" dataKey="postHam" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default NaiveBayesViz;
