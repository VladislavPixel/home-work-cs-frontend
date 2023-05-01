import { sleep } from "../task1/sleep";

function timeout<T>(promiseTarget: Promise<T>, ms: number): Promise<T> {
	return new Promise((resolve, reject): void => {
		sleep(ms)
			.then(() => promiseTarget)
			.then((data) => {
				resolve(data);
			})
			.catch((errData) => {
				reject(errData);
			});
	});
};

export { timeout };
