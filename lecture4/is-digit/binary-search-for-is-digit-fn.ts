import type { IElementRange } from "./type";

function binarySearchForIsDigitFn<T>(
  searchValue: T,
  arr: IElementRange[]
): number {
  let startIndex = 0;

  let endIndex = arr.length - 1;

  if (
    searchValue < arr[startIndex].leftBorder ||
    searchValue > arr[endIndex].rightBorder
  ) {
    throw new Error("Search value is not in array range.");
  }

  if (
    searchValue >= arr[startIndex].leftBorder &&
    searchValue <= arr[startIndex].rightBorder
  ) {
    return startIndex;
  }

  if (
    searchValue >= arr[endIndex].leftBorder &&
    searchValue <= arr[endIndex].rightBorder
  ) {
    return endIndex;
  }

  if (endIndex - startIndex < 2) {
    return -1;
  }

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (
      searchValue >= arr[middleIndex].leftBorder &&
      searchValue <= arr[middleIndex].rightBorder
    ) {
      return middleIndex;
    }

    if (searchValue > arr[middleIndex].rightBorder) {
      startIndex = middleIndex + 1;
    } else if (searchValue < arr[middleIndex].leftBorder) {
      endIndex = middleIndex - 1;
    } else {
      return -1;
    }
  }

  return -1;
}

export default binarySearchForIsDigitFn;
