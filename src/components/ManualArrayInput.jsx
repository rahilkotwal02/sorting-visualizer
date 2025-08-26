import React, { useState } from 'react';

// Cosmic Button Component
const CosmicButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  className = '',
  type = 'button'
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl px-6 py-3
    transition-all duration-300 transform
    focus:outline-none focus:ring-4 focus:ring-blue-500/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
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
    secondary: `
      bg-gray-700 text-gray-200 shadow-lg shadow-gray-700/30
      hover:bg-gray-600 hover:shadow-xl hover:shadow-gray-600/40 hover:scale-105
      active:scale-95
    `
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
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

const ManualArrayInput = ({ onArraySubmit, isVisible, onClose, isSorting }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const numbers = inputValue
        .split(/[,\s]+/)
        .map(str => str.trim())
        .filter(str => str !== '' && str !== ',')
        .map(str => {
          const num = parseInt(str, 10);
          if (isNaN(num)) {
            throw new Error(`"${str}" is not a valid number`);
          }
          if (num < 1 || num > 1000) {
            throw new Error(`Number ${num} must be between 1 and 1000`);
          }
          return num;
        });

      if (numbers.length === 0) {
        throw new Error('Please enter at least one number');
      }
      if (numbers.length > 100) {
        throw new Error('Maximum 100 numbers allowed');
      }

      onArraySubmit(numbers);
      setInputValue('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setInputValue('');
    setError('');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <CosmicCard className="max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-purple-400">Manual Array Input</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
            disabled={isSorting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Enter numbers (separated by commas or spaces):
            </label>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              rows="4"
              disabled={isSorting}
            />
            <div className="text-xs text-gray-400 mt-2">
              Numbers should be between 1-1000. Maximum 100 numbers allowed.
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <CosmicButton
              type="submit"
              variant="hero"
              disabled={isSorting || !inputValue.trim()}
              className="flex-1"
            >
              Apply Array
            </CosmicButton>
            <CosmicButton
              variant="secondary"
              onClick={handleClose}
              disabled={isSorting}
              type="button"
            >
              Cancel
            </CosmicButton>
          </div>
        </form>
      </CosmicCard>
    </div>
  );
};

export default ManualArrayInput;
