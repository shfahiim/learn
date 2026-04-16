import React, { useMemo, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const PolynomialRegressionViz = () => {
  const [degree, setDegree] = useState(1);

  const { data, curve } = useMemo(() => {
    // Generate noisy sine-like data
    const points = [];
    for (let x = 0; x <= 10; x += 1) {
      const y = 5 + 5 * Math.sin(x / 2) + (Math.random() - 0.5) * 2;
      points.push({ x, y });
    }

    // Generate fitting curve based on degree
    const curvePoints = [];
    for (let x = 0; x <= 10; x += 0.2) {
      let y = 0;
      if (degree === 1) {
        // Simple linear fit approximation
        y = 0.5 * x + 4;
      } else if (degree === 2) {
        // Quadratic approximation
        y = -0.3 * (x - 5)**2 + 8;
      } else if (degree === 9) {
        // Overfitting approximation (wiggly)
        y = 5 + 5 * Math.sin(x / 2) + 2 * Math.sin(x * 3);
      }
      curvePoints.push({ x, y: parseFloat(y.toFixed(2)) });
    }

    return { data: points, curve: curvePoints };
  }, [degree]);

  return (
    <div className="my-8">
      <ChartCard 
        title="Polynomial Regression & Expressive Power" 
        subtitle="Vary the degree of the polynomial to see how the model's 'capacity' changes."
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 9].map((d) => (
            <button 
              key={d}
              onClick={() => setDegree(d)}
              className={`px-4 py-2 rounded text-sm font-bold transition-all ${
                degree === d 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d === 1 ? 'Linear (d=1)' : d === 2 ? 'Quadratic (d=2)' : 'Complex (d=9)'}
            </button>
          ))}
        </div>

        <div className="h-[350px] w-full bg-white rounded-lg p-2">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} domain={[0, 10]} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} domain={[0, 15]} />
              <Tooltip {...chartTooltipProps} />
              <Legend verticalAlign="top" height={36}/>
              
              <Scatter name="Training Data" data={data} fill="#64748b" />
              <Line 
                name={`Hypothesis (Degree ${degree})`} 
                data={curve} 
                type="monotone" 
                dataKey="y" 
                stroke={degree === 9 ? '#ef4444' : '#3b82f6'} 
                strokeWidth={3} 
                dot={false}
                animationDuration={500}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className={`mt-4 p-4 rounded-md border ${
          degree === 1 ? 'bg-orange-50 border-orange-100 text-orange-800' : 
          degree === 2 ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 
          'bg-red-50 border-red-100 text-red-800'
        }`}>
          <h4 className="font-bold mb-1 uppercase text-xs tracking-wider">
            {degree === 1 ? 'Underfitting (High Bias)' : 
             degree === 2 ? 'Balanced Fit' : 
             'Overfitting (High Variance)'}
          </h4>
          <p className="text-sm">
            {degree === 1 ? 'The straight line is too rigid. It misses the inherent curvature of the data.' : 
             degree === 2 ? 'The quadratic curve captures the general trend well without following every noise point.' : 
             'The degree-9 polynomial has too much "expressive power". It memorizes the noise, resulting in a poor generalization.'}
          </p>
        </div>
      </ChartCard>
    </div>
  );
};

export default PolynomialRegressionViz;
