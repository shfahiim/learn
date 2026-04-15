import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const ROCCurveViz = () => {
  const data = useMemo(() => {
    const points = [];
    for (let fpr = 0; fpr <= 1; fpr += 0.05) {
      // Idealized ROC curve: tpr = fpr^(1/3) for a good model
      const tpr = Math.pow(fpr, 0.3);
      points.push({ fpr, tpr });
    }
    return points;
  }, []);

  return (
    <div className="my-8">
      <ChartCard title="ROC Curve and AUC" subtitle="Plots True Positive Rate (Recall) against False Positive Rate. The Area Under the Curve (AUC) measures the overall quality of the classifier.">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="fpr" domain={[0, 1]} {...chartAxisProps} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
              <YAxis type="number" dataKey="tpr" domain={[0, 1]} {...chartAxisProps} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
              <Tooltip {...chartTooltipProps} />
              <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="#666" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="tpr" stroke="#8884d8" strokeWidth={4} dot={false} />
              <Area type="monotone" dataKey="tpr" fill="#8884d8" fillOpacity={0.1} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-purple-50 border border-purple-100 rounded text-xs text-purple-800 flex justify-between items-center">
          <span><strong>AUC ≈ 0.88:</strong> Excellent separation between classes.</span>
          <span className="opacity-60 italic">Dashed line = Random Guessing (AUC 0.5)</span>
        </div>
      </ChartCard>
    </div>
  );
};

export default ROCCurveViz;
