import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const LearningCurvesViz = () => {
  const [scenario, setScenario] = useState('bias'); // 'bias' or 'variance'

  const data = useMemo(() => {
    const points = [];
    for (let m = 10; m <= 100; m += 10) {
      if (scenario === 'bias') {
        // High Bias: Both errors high and close
        points.push({
          m,
          train: 15 - 5 * Math.exp(-m/20),
          val: 16 + 5 * Math.exp(-m/20),
        });
      } else {
        // High Variance: Training error low, Val error high, large gap
        points.push({
          m,
          train: 2 + 1 * Math.exp(-m/50),
          val: 15 + 10 * Math.exp(-m/30),
        });
      }
    }
    return points;
  }, [scenario]);

  return (
    <div className="my-8">
      <ChartCard 
        title="Diagnosing with Learning Curves" 
        subtitle="Toggle between scenarios to see how the gap between Training and Validation error identifies the model's problem."
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setScenario('bias')}
            className="chart-button"
            data-active={scenario === 'bias'}
            style={scenario === 'bias' ? { background: 'var(--chart-danger)', color: '#fff', borderColor: 'transparent' } : {}}
          >
            Scenario A: High Bias
          </button>
          <button 
            onClick={() => setScenario('variance')}
            className="chart-button"
            data-active={scenario === 'variance'}
            style={scenario === 'variance' ? { background: 'var(--chart-secondary)', color: '#fff', borderColor: 'transparent' } : {}}
          >
            Scenario B: High Variance
          </button>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="m" label={{ value: 'Training Set Size (m)', position: 'insideBottom', offset: -10 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Error', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Legend verticalAlign="top" height={36}/>
              
              <Line 
                name="Training Error" 
                type="monotone" 
                dataKey="train" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                activeDot={{ r: 8 }}
                animationDuration={500}
              />
              <Line 
                name="Validation Error" 
                type="monotone" 
                dataKey="val" 
                stroke="#ef4444" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
                activeDot={{ r: 8 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`mt-4 p-4 rounded-md border ${scenario === 'bias' ? 'bg-red-50 border-red-100 text-red-800' : 'bg-orange-50 border-orange-100 text-orange-800'}`}>
          <h4 className="font-bold mb-1">
            {scenario === 'bias' ? 'Diagnosis: Underfitting (High Bias)' : 'Diagnosis: Overfitting (High Variance)'}
          </h4>
          <p className="text-sm">
            {scenario === 'bias' 
              ? 'Notice how the training error is high and the validation error flattened early. Adding more data will NOT help here. You need a more complex model.' 
              : 'Notice the large gap between training and validation error. The model is memorizing the training data. Adding more data will likely help close this gap.'}
          </p>
        </div>
      </ChartCard>
    </div>
  );
};

export default LearningCurvesViz;
