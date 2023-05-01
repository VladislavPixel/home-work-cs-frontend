function promisify(callback) {
	return function (...args) {
		const helperFN = (err: null | Error, data): any => {
			if (err !== null) {
				throw new Error("Ошибка в вызове функции");
			}

			console.log("Преобразую данный и возвращаю их.");

			return data;
		};

		return new Promise((resolve, reject): void => {
			try {
				const data = callback(...args, helperFN);

				resolve(data);
			} catch (err) {
				reject(err);
			}
		});
	};
};

export { promisify };
