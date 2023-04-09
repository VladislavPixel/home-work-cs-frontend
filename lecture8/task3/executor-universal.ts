/* eslint-disable */
export function executorUniversal<T, R>(generatorFN: () => Generator<T, any, R | undefined>): Promise<R | undefined> {
	const generatorObject = generatorFN();

	const helperGenerator = (gen: Generator<T, any, R | undefined>, arg?: R | undefined): Promise<R | undefined> => {
		return Promise.resolve(arg)
			.then((data) => {
				const result = gen.next(data);

				if (result.done) {
					return Promise.resolve(result.value);
				}

				return Promise.resolve(result.value)
					.then((data) => {
						return helperGenerator(gen, data as any);
					})
					.catch((err) => {
						const resultError = gen.throw(err);

						if (resultError.done) {
							return resultError.value;
						}

						return helperGenerator(gen);
					});
			})
			.catch((err) => {
				const resultError = gen.throw(err);

				if (resultError.done) {
					return resultError.value;
				}

				return helperGenerator(gen);
			});
	};

	return helperGenerator(generatorObject);
}
/* eslint-enable */
