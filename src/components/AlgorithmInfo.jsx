import React from 'react';
import { algorithmInfo } from '../data/algorithmInfo';

// Cosmic Card Component
const CosmicCard = ({ children, className = '', hover = true }) => {
  const baseClasses = `
    bg-gray-800 rounded-xl border border-white/10 backdrop-blur-sm
    ${hover ? 'transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20' : ''}
  `;
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

const AlgorithmInfo = ({ algorithm }) => {
  const info = algorithmInfo[algorithm];
  
  const getComplexityColor = (complexity) => {
    if (complexity.includes('n²')) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (complexity.includes('n log n')) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    if (complexity.includes('n')) return 'text-green-400 bg-green-500/20 border-green-500/30';
    return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  };

  return (
    <CosmicCard className="p-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-purple-400 mb-4">{info.name}</h3>
          <p className="text-gray-300 mb-6">{info.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-3">Time Complexity:</h4>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getComplexityColor(info.timeComplexity.best)}`}>
                  Best: {info.timeComplexity.best}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getComplexityColor(info.timeComplexity.average)}`}>
                  Average: {info.timeComplexity.average}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getComplexityColor(info.timeComplexity.worst)}`}>
                  Worst: {info.timeComplexity.worst}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Space Complexity:</h4>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getComplexityColor(info.spaceComplexity)}`}>
                {info.spaceComplexity}
              </span>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${info.stable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-300">
                  {info.stable ? 'Stable' : 'Not Stable'}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${info.adaptive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-300">
                  {info.adaptive ? 'Adaptive' : 'Not Adaptive'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">How It Works:</h4>
          <ol className="list-decimal list-inside space-y-2">
            {info.howItWorks.map((step, index) => (
              <li key={index} className="text-gray-300 text-sm leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </CosmicCard>
  );
};

export default AlgorithmInfo;
