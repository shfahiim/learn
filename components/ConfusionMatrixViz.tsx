import React from 'react';
import { ChartCard } from './charts/ChartCard';

const ConfusionMatrixViz = () => {
  return (
    <div className="my-8">
      <ChartCard title="The Confusion Matrix" subtitle="A visual representation of prediction outcomes. Each row represents the actual class, and each column represents the predicted class.">
        <div className="ml-scroll-x">
          <div className="flex justify-center p-4">
            <div className="ml-min-w-matrix grid grid-cols-3 gap-2 text-center items-center">
              <div className="col-start-2 font-bold text-sm text-gray-500">Predicted Positive</div>
              <div className="font-bold text-sm text-gray-500">Predicted Negative</div>

              <div className="font-bold text-sm text-gray-500 [writing-mode:vertical-lr] rotate-180">Actual Positive</div>
              <div className="bg-green-100 border-2 border-green-500 p-6 rounded-lg">
                <div className="text-2xl font-black text-green-700">TP</div>
                <div className="text-xs text-green-600 font-bold uppercase">True Positive</div>
              </div>
              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg opacity-80">
                <div className="text-2xl font-black text-red-700">FN</div>
                <div className="text-xs text-red-600 font-bold uppercase">False Negative</div>
              </div>

              <div className="font-bold text-sm text-gray-500 [writing-mode:vertical-lr] rotate-180">Actual Negative</div>
              <div className="bg-red-100 border-2 border-red-500 p-6 rounded-lg">
                <div className="text-2xl font-black text-red-700">FP</div>
                <div className="text-xs text-red-600 font-bold uppercase">False Positive</div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg opacity-80">
                <div className="text-2xl font-black text-green-700">TN</div>
                <div className="text-xs text-green-600 font-bold uppercase">True Negative</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded text-blue-800">
            <strong>Type I Error (FP):</strong> False alarm. We predicted something that isn't there.
          </div>
          <div className="p-3 bg-orange-50 border border-orange-100 rounded text-orange-800">
            <strong>Type II Error (FN):</strong> Miss. We failed to detect an actual positive.
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default ConfusionMatrixViz;
