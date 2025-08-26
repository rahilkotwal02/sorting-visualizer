import React from 'react';

// Cosmic Button Component
const CosmicButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  className = '',
  size = 'md',
  icon
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 transform
    focus:outline-none focus:ring-4 focus:ring-blue-500/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-6 py-3'}
  `;

  const variants = {
    primary: `
      bg-blue-500 text-white shadow-lg shadow-blue-500/30
      hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105
      active:scale-95
    `,
    hero: `
      bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30
      hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105
      active:scale-95
    `,
    destructive: `
      bg-gray-600 text-white shadow-lg shadow-gray-600/30
      hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-gray-700 text-gray-200 shadow-lg shadow-gray-700/30
      hover:bg-gray-600 hover:shadow-xl hover:shadow-gray-600/40 hover:scale-105
      active:scale-95
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {children}
    </button>
  );
};

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

// Cosmic Range Slider
const CosmicSlider = ({ min, max, value, onChange, disabled, label }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-cosmic"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
        }}
      />
    </div>
  );
};

const Controls = ({ 
  arraySize, 
  setArraySize, 
  speed, 
  setSpeed, 
  selectedAlgorithm, 
  setSelectedAlgorithm, 
  generateNewArray, 
  startSorting, 
  isSorting, 
  resetArray, 
  showManualInput, 
  setShowManualInput 
}) => {
  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', icon: '🫧' },
    { id: 'insertion', name: 'Insertion Sort', icon: '📥' },
    { id: 'merge', name: 'Merge Sort', icon: '🔀' },
    { id: 'quick', name: 'Quick Sort', icon: '⚡' }
  ];

  return (
    <CosmicCard className="p-6 mb-8">
      {/* Algorithm Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Choose Algorithm</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {algorithms.map((algo) => (
            <CosmicButton
              key={algo.id}
              variant={selectedAlgorithm === algo.id ? 'hero' : 'secondary'}
              onClick={() => setSelectedAlgorithm(algo.id)}
              disabled={isSorting}
              className="p-4 flex-col h-20"
              icon={algo.icon}
            >
              <div className="text-sm mt-1">{algo.name}</div>
            </CosmicButton>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CosmicSlider
          min={10}
          max={100}
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isSorting}
          label={`Array Size: ${arraySize}`}
        />
        <CosmicSlider
          min={1}
          max={500}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
          label={`Speed: ${speed}ms`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <CosmicButton
          variant="primary"
          onClick={generateNewArray}
          disabled={isSorting}
          icon="🎲"
        >
          Generate New Array
        </CosmicButton>
        <CosmicButton
          variant="secondary"
          onClick={() => setShowManualInput(true)}
          disabled={isSorting}
          icon="✏️"
        >
          Manual Input
        </CosmicButton>
        <CosmicButton
          variant="hero"
          onClick={startSorting}
          disabled={isSorting}
          icon={isSorting ? '⏳' : '▶️'}
        >
          {isSorting ? 'Sorting...' : 'Start Sort'}
        </CosmicButton>
        <CosmicButton
          variant="destructive"
          onClick={resetArray}
          disabled={isSorting}
          icon="🔄"
        >
          Reset
        </CosmicButton>
      </div>

      {/* Color Legend */}
      <CosmicCard className="p-4 bg-gray-900/50">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Color Legend:</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-2 shadow-sm"></div>
            <span className="text-gray-300">Unsorted</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded mr-2 shadow-sm"></div>
            <span className="text-gray-300">Comparing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded mr-2 shadow-sm"></div>
            <span className="text-gray-300">Sorted</span>
          </div>
        </div>
      </CosmicCard>
    </CosmicCard>
  );
};

export default Controls;
