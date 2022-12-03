function recBinarySearch<T>(searchValue: T, arr: T[]): number {
	const startIndex = 0;

	const endIndex = arr.length - 1;

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

	const recAuxiliaryFn = (start: number, end: number): number => {
		if (start > end) {
			return -1;
		}

		const middleIndex = Math.floor((start + end) / 2);

		if (searchValue === arr[middleIndex]) {
			return middleIndex;
		}

		if (searchValue > arr[middleIndex]) {
			return recAuxiliaryFn(middleIndex + 1, end);
		}

		return recAuxiliaryFn(start, middleIndex - 1);
	};

	return recAuxiliaryFn(startIndex, endIndex);
}

export default recBinarySearch;
