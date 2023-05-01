import { IImmediateResult } from "../types";

function clearImmediate(configImmediate: IImmediateResult): void {
	configImmediate.controller.abort("clear immediate");
};

export { clearImmediate };
