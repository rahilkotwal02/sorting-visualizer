import React from 'react';

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

const Bars = ({ array, comparingIndices, sortedIndices }) => {
  const maxValue = Math.max(...array);

  return (
    <CosmicCard className="p-6 mb-8">
      <div className="flex items-end justify-center space-x-1 h-96 overflow-x-auto">
        {array.map((value, index) => {
          let barColor = 'from-blue-400 to-blue-600 shadow-blue-500/30';
          
          if (sortedIndices.has(index)) {
            barColor = 'from-green-400 to-green-600 shadow-green-500/30';
          } else if (comparingIndices.includes(index)) {
            barColor = 'from-red-400 to-red-600 shadow-red-500/30';
          }

          const barHeight = (value / maxValue) * 100;
          const barWidth = Math.max(800 / array.length - 2, 4);

          return (
            <div
              key={index}
              className={`bg-gradient-to-t ${barColor} transition-all duration-300 ease-in-out rounded-t-lg shadow-lg relative flex flex-col justify-end`}
              style={{
                height: `${barHeight}%`,
                width: `${barWidth}px`,
                minWidth: '4px',
                boxShadow: sortedIndices.has(index) ? '0 0 20px rgba(34, 197, 94, 0.3)' : 
                          comparingIndices.includes(index) ? '0 0 20px rgba(239, 68, 68, 0.3)' : 
                          '0 0 10px rgba(59, 130, 246, 0.2)'
              }}
              title={`Value: ${value}, Index: ${index}`}
            >
              {array.length <= 50 && (
                <div className={`text-white text-center font-bold transform -rotate-90 origin-center ${
                  array.length <= 20 ? 'text-xs' : 
                  array.length <= 30 ? 'text-[10px]' : 'text-[8px]'
                } mb-1`}>
                  {value}
                </div>
              )}
              
              {array.length > 50 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity z-10 border border-white/20">
                  {value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CosmicCard>
  );
};

export default Bars;
