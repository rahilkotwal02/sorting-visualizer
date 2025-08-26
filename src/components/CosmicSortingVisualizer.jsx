import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Controls from './Controls';
import Bars from './Bars';
import AlgorithmInfo from './AlgorithmInfo';
import ManualArrayInput from './ManualArrayInput';
import { bubbleSort, insertionSort, mergeSort, quickSort } from '../utils/sortingAlgorithms';

// Starfield Background Animation
const StarfieldBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.id * 0.1}s`,
            animationDuration: `${2 + star.speed}s`,
          }}
        />
      ))}
    </div>
  );
};

// Cosmic Card Component
const CosmicCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-xl border border-white/10 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

// Cosmic Button Component
const CosmicButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  icon
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl px-6 py-3
    transition-all duration-300 transform
    focus:outline-none focus:ring-4 focus:ring-blue-500/50
  `;

  const variants = {
    hero: `
      bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30
      hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105
      active:scale-95
    `
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {children}
    </button>
  );
};

// Empty State Component
const EmptyState = ({ icon = "🌌", title = "The Void is Empty", description, action }) => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-400 mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      {action}
    </div>
  );
};

// Main Sorting Visualizer Component
const CosmicSortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(100);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [showManualInput, setShowManualInput] = useState(false);

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 400) + 10
    );
    setArray(newArray);
    setOriginalArray([...newArray]);
    setComparingIndices([]);
    setSortedIndices(new Set());
  }, [arraySize]);

  // Handle manual array input
  const handleManualArray = (newArray) => {
    setArray([...newArray]);
    setOriginalArray([...newArray]);
    setComparingIndices([]);
    setSortedIndices(new Set());
  };

  // Generate new array when arraySize changes
  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  // Reset to original array
  const resetArray = () => {
    setArray([...originalArray]);
    setComparingIndices([]);
    setSortedIndices(new Set());
  };

  // Start sorting animation
  const startSorting = async () => {
    if (isSorting) return;
    
    setIsSorting(true);
    setComparingIndices([]);
    setSortedIndices(new Set());

    const sortingFunctions = {
      bubble: bubbleSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort
    };

    const sortFunction = sortingFunctions[selectedAlgorithm];
    
    try {
      await sortFunction(array, setArray, setComparingIndices, setSortedIndices, speed);
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setIsSorting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative">
      {/* Custom CSS for slider and animations */}
      <style jsx>{`
        .slider-cosmic::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #A855F7, #3B82F6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .slider-cosmic::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #A855F7, #3B82F6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>

      {/* Starfield Background */}
      <StarfieldBackground />

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Sorting Algorithm Visualizer
          </h1>
          {/* <h2 className="text-3xl font-semibold text-white mb-2">
            
          </h2> */}
          <p className="text-gray-300 text-lg">
            Journey through the cosmos of sorting algorithms with visual effects
          </p>
        </div>

        {/* Status */}
        <div className="text-center mb-8">
          <CosmicCard className="inline-block px-6 py-3">
            <p className="text-lg font-medium text-white">
              <span className="text-blue-400">Array Length:</span> {array.length} | 
              <span className="text-purple-400 ml-2">Status:</span> 
              <span className={`ml-2 ${isSorting ? 'text-yellow-400' : 'text-green-400'}`}>
                {isSorting ? 'Sorting...' : 'Ready'}
              </span>
            </p>
          </CosmicCard>
        </div>

        {/* Algorithm Info */}
        <AlgorithmInfo algorithm={selectedAlgorithm} />

        {/* Controls */}
        <Controls
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          generateNewArray={generateRandomArray}
          startSorting={startSorting}
          isSorting={isSorting}
          resetArray={resetArray}
          showManualInput={showManualInput}
          setShowManualInput={setShowManualInput}
        />

        {/* Visualization */}
        {array.length > 0 ? (
          <Bars 
            array={array} 
            comparingIndices={comparingIndices} 
            sortedIndices={sortedIndices} 
          />
        ) : (
          <CosmicCard className="p-12">
            <EmptyState 
              title="No Array Generated"
              description="Generate a new array to begin your cosmic sorting journey"
              action={
                <CosmicButton variant="hero" onClick={generateRandomArray} icon="🚀">
                  Generate Array
                </CosmicButton>
              }
            />
          </CosmicCard>
        )}

        {/* Manual Input Modal */}
        <ManualArrayInput
          onArraySubmit={handleManualArray}
          isVisible={showManualInput}
          onClose={() => setShowManualInput(false)}
          isSorting={isSorting}
        />

        {/* Footer */}
        <div className="text-center mt-12">
          <CosmicCard className="inline-block px-6 py-3">
            <p className="text-gray-300">
              Built with ❤️ using React and Tailwind
            </p>
          </CosmicCard>
        </div>
      </div>
    </div>
  );
};

export default CosmicSortingVisualizer;
