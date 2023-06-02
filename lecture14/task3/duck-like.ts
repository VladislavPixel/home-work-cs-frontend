import { Duckable } from "./duckable";
import { Trait } from "../types";
import { derive } from "./derive";

interface DuckLike extends Trait<typeof Duckable> {}

@derive(Duckable)
class DuckLike implements Duckable {
	name: string = "Bob";

	fly(): void {
		console.log("Do some logic to fly");
	};
};

export { DuckLike };
