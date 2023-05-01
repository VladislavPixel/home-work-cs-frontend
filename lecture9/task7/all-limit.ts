function allLimit(iterableFNs, limit): any {
	if (iterableFNs.length === 0 || limit === 0) {
		return new Promise((resolve) => {
			resolve([]);
		});
	}

	const mapIndexesForFN = new Map();

	const arrFNs = [];

	let i = 0;

	for (const fn of iterableFNs) {
		mapIndexesForFN.set(fn, i);

		arrFNs[i] = fn;

		i++;
	}

	i = 0;

	let currentIndex = 0;

	let numberOfProcessedPromises = 0;

	let isWork = true;

	const result = [];

	return new Promise((resolve, reject) => {
		const helper = (): void => {
			if (isWork) {
				if (numberOfProcessedPromises < limit && currentIndex < arrFNs.length) {
					numberOfProcessedPromises++;

					const fn = arrFNs[currentIndex];

					console.log(mapIndexesForFN.get(fn), "Promise в обработку");

					currentIndex++;

					const targetPromise = Promise.resolve(fn());

					targetPromise
						.then((data) => {
							if (isWork) {
								numberOfProcessedPromises--;

								result[mapIndexesForFN.get(fn)] = data;

								i++;

								if (i === arrFNs.length) {
									isWork = false;

									resolve(result);
								} else {
									helper();
								}
							}
						})
						.catch((err) => {
							if (isWork) {
								isWork = false;

								numberOfProcessedPromises--;

								reject(err);
							}
						});

					helper();
				}
			}
		};

		helper();
	});
};

export { allLimit };
