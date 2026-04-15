import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const generateData = (count: number, isLabeled: boolean) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const classLabel = Math.random() > 0.5 ? 1 : 0;
    const x = classLabel === 1 ? Math.random() * 5 + 5 : Math.random() * 5;
    const y = classLabel === 1 ? Math.random() * 5 + 5 : Math.random() * 5;
    data.push({
      x,
      y,
      label: isLabeled ? (classLabel === 1 ? 'Class A' : 'Class B') : 'Unlabeled',
      color: isLabeled ? (classLabel === 1 ? '#8884d8' : '#82ca9d') : '#8884d8'
    });
  }
  return data;
};

const SupervisedVsUnsupervised = () => {
  const [labeledData] = useState(() => generateData(40, true));
  const [unlabeledData] = useState(() => generateData(40, false));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <ChartCard title="Supervised Learning (Labeled Data)" subtitle="Data points are associated with known target classes.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="feature 1" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="feature 2" {...chartAxisProps} />
              <ZAxis type="category" dataKey="label" />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data Points" data={labeledData}>
                {labeledData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Unsupervised Learning (Unlabeled Data)" subtitle="Raw data points without any target labels or categories.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="feature 1" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="feature 2" {...chartAxisProps} />
              <ZAxis type="category" dataKey="label" />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data Points" data={unlabeledData}>
                {unlabeledData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default SupervisedVsUnsupervised;
