// Helper function to create delay for animations
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Bubble Sort Algorithm
export const bubbleSort = async (array, setArray, setComparingIndices, setSortedIndices, speed) => {
  const arr = [...array];
  const n = arr.length;
  const sorted = new Set();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setComparingIndices([j, j + 1]);
      await sleep(speed);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
    sorted.add(n - 1 - i);
    setSortedIndices(new Set(sorted));
  }
  sorted.add(0);
  setSortedIndices(new Set(sorted));
  setComparingIndices([]);
};

// Insertion Sort Algorithm
export const insertionSort = async (array, setArray, setComparingIndices, setSortedIndices, speed) => {
  const arr = [...array];
  const n = arr.length;
  const sorted = new Set([0]);

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    setComparingIndices([i]);
    await sleep(speed);

    while (j >= 0 && arr[j] > key) {
      setComparingIndices([j, j + 1]);
      arr[j + 1] = arr[j];
      setArray([...arr]);
      await sleep(speed);
      j--;
    }
    arr[j + 1] = key;
    setArray([...arr]);
    sorted.add(i);
    setSortedIndices(new Set(sorted));
    await sleep(speed);
  }
  setComparingIndices([]);
};

// Merge Sort Algorithm
export const mergeSort = async (array, setArray, setComparingIndices, setSortedIndices, speed) => {
  const arr = [...array];

  const merge = async (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setComparingIndices([left + i, mid + 1 + j]);
      await sleep(speed);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      k++;
      await sleep(speed);
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
      await sleep(speed);
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
      await sleep(speed);
    }
  };

  const mergeSortRecursive = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortRecursive(left, mid);
      await mergeSortRecursive(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortRecursive(0, arr.length - 1);
  setSortedIndices(new Set(Array.from({ length: arr.length }, (_, i) => i)));
  setComparingIndices([]);
};

// Quick Sort Algorithm
export const quickSort = async (array, setArray, setComparingIndices, setSortedIndices, speed) => {
  const arr = [...array];
  const sorted = new Set();

  const partition = async (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setComparingIndices([j, high]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    sorted.add(i + 1);
    setSortedIndices(new Set(sorted));
    await sleep(speed);
    return i + 1;
  };

  const quickSortRecursive = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortRecursive(low, pi - 1);
      await quickSortRecursive(pi + 1, high);
    }
  };

  await quickSortRecursive(0, arr.length - 1);
  setSortedIndices(new Set(Array.from({ length: arr.length }, (_, i) => i)));
  setComparingIndices([]);
};
