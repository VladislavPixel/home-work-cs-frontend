function binarySearch<T>(searchValue: T, arr: T[]): number {
  let startIndex = 0;

  let endIndex = arr.length - 1;

  if (searchValue < arr[startIndex] || searchValue > arr[endIndex]) {
    throw new Error("Search value is not in array range.");
  }

  if (arr[startIndex] === searchValue) {
    return startIndex;
  }

  if (arr[endIndex] === searchValue) {
    return endIndex;
  }

  if (endIndex - startIndex < 2) {
    return -1;
  }

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (arr[middleIndex] === searchValue) {
      return middleIndex;
    }

    if (searchValue > arr[middleIndex]) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}

export default binarySearch;
