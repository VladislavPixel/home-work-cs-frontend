import { CallbackType, IImmediateResult } from "../types";

function setImmediate<T extends CallbackType, A>(callback: T, ...args: A[]): IImmediateResult {
	const timeStamp = Date.now();

	const controller = new AbortController();

	let isClear = false;

	const promiseAux = new Promise((resolve) => {
		resolve(true);
	});

	promiseAux
		.then(() => {
			if (!isClear) {
				callback(...args);
			}
		});

	controller.signal.addEventListener("abort", () => {
		isClear = true;
	});

	return {
		controller,
		timeStamp
	};
};

export { setImmediate };
