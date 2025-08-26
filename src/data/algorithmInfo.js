export const algorithmInfo = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order.',
    howItWorks: [
      'Compare adjacent elements',
      'Swap if they are in wrong order',
      'Repeat until no swaps needed',
      'Largest elements "bubble" to the end'
    ],
    stable: true,
    adaptive: true
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Insertion Sort builds the final sorted array one item at a time by finding the correct position.',
    howItWorks: [
      'Start with second element as key',
      'Compare key with sorted elements',
      'Shift larger elements to the right',
      'Insert key at correct position'
    ],
    stable: true,
    adaptive: true
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Merge Sort uses divide-and-conquer approach, dividing the array and merging sorted halves.',
    howItWorks: [
      'Divide array into two halves',
      'Recursively sort both halves',
      'Merge the sorted halves',
      'Combine results bottom-up'
    ],
    stable: true,
    adaptive: false
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Quick Sort picks a pivot element and partitions the array around it recursively.',
    howItWorks: [
      'Choose a pivot element',
      'Partition array around pivot',
      'Recursively sort left partition',
      'Recursively sort right partition'
    ],
    stable: false,
    adaptive: false
  }
};
