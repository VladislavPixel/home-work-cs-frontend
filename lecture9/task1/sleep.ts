function sleep(ms: number): Promise<true> {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve(true);
		}, ms);
	});
};

export { sleep };
