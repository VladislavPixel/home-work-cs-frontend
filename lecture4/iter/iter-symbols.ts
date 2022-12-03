interface IResultForNextMethod {
	value: undefined | string;
	done: boolean;
}

export interface IIterator {
	next(): IResultForNextMethod;
	[Symbol.iterator](): IIterator;
}

function iter(strValue: string): IIterator {
	const isSurrogate = (str: string, index: number): boolean => {
		const codePoint = str.codePointAt(index);

		const codePointPrev = str.codePointAt(index - 1);
		if (codePoint && codePoint >= 65536) {
			return true;
		}

		if (codePointPrev && codePointPrev >= 65536) {
			return true;
		}

		return false;
	};

	let stack: number[] = [];

	let currentIndex: number = 0;

	return {
		next(): IResultForNextMethod {
			while (currentIndex < strValue.length) {
				const code = strValue.charCodeAt(currentIndex);

				if (stack.length === 2) {
					const strSymbol = String.fromCharCode(...stack);

					stack = [];

					return { value: strSymbol, done: false };
				}

				if (isSurrogate(strValue, currentIndex)) {
					stack.push(code);

					currentIndex++;

					continue;
				}

				const char = strValue.charAt(currentIndex);

				currentIndex++;

				return { value: char, done: false };
			}

			if (stack.length !== 0) {
				const strSymbol = String.fromCharCode(...stack);

				stack = [];

				return { value: strSymbol, done: false };
			}

			return { value: undefined, done: true };
		},

		[Symbol.iterator]: function (): IIterator {
			return this;
		}
	};
}

export default iter;
