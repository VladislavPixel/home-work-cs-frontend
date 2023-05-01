export interface IImmediateResult {
	controller: AbortController;
	timeStamp: number;
};

export type CallbackType = (...a) => any;

export type StateSyncPromise = "pending" | "rejected" | "fulfilled";
