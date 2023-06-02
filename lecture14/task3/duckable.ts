import { AddSelf } from "../types";

abstract class Duckable {
	abstract name: string;
	abstract fly(): void;

	getQuack(size: number): string {
		throw "Unimplemented!";
	};

	static getQuack: AddSelf<Duckable["getQuack"], Duckable> = (self: Duckable, size: number): string => {
		if (size < 10) {
			return "quack!";
		}

		if (size < 20) {
			return "quack!!!";
		}

		return "QUACK!!!";
	};
};

export { Duckable };
