import { IResult } from "../types";
import { Result } from "../task1/container-result";

/* eslint-disable */
export function executor<T, R>(generatorFN: () => Generator<IResult<T>, any, R | undefined>): Promise<T | undefined> {
	const generatorObject = generatorFN();

	const helperGenerator = (gen: Generator<IResult<T>, any, R | undefined>, arg?: R | undefined): Promise<T | undefined> => {
		const propsNext = arg instanceof Result
			? arg.unwrap()
			: arg;

		const state = gen.next(propsNext);

		if (state.done) {
			return Promise.resolve(state.value);
		}

		return Promise.resolve(state.value)
			.then((data) => {
				return helperGenerator(gen, data);
			})
			.catch((err) => {
				const stateError = gen.throw(err);

				if (stateError.done) {
					return stateError.value;
				}

				return helperGenerator(gen);
			});
	};

	return helperGenerator(generatorObject);
}
/* eslint-enable */
