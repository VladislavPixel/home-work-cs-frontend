import { StateSyncPromise } from "../types";

class SyncPromise {
	state: StateSyncPromise = "pending";

	result?: any;

	controller: AbortController = new AbortController();

	childConfig = {
		child: null,
		controller: null
	};

	resolveFN = function (data) {
		this.state = "fulfilled";

		this.result = data;

		this.controller.abort("resolve executor SyncPromise");
	}.bind(this);

	rejectFN = function (err) {
		this.state = "rejected";

		this.result = err;

		this.controller.abort("reject executor SyncPromise");
	}.bind(this);

	constructor(executor) {
		try {
			executor(
				this.resolveFN,
				this.rejectFN
			);
		} catch (err) {
			this.rejectFN(err);
		}
	};

	setChild(childSyncPromise): void {
		this.childConfig.child = childSyncPromise;

		this.childConfig.controller = childSyncPromise.controller;
	};

	provocationChild(): void {
		this.childConfig.child.state = this.state;

		this.childConfig.child.result = this.result;
	};

	applyToChild(resolveChild, rejectChild, handlerResolver, handlerRejected): any {
		const { child } = this.childConfig;

		if (child.state === "fulfilled") {
			if (!(child.result instanceof Promise)) {
				const value = handlerResolver(child.result);

				resolveChild(value);
			} else {
				child.result
					.then((data) => {
						const value = handlerResolver(data);

						resolveChild(value);
					})
					.catch((err) => {
						if (typeof handlerRejected !== "function") {
							rejectChild(err);
						} else {
							const valueErr = handlerRejected(err);

							resolveChild(valueErr);
						}
					});
			}
		} else if (child.state === "rejected") {
			if (!(child.result instanceof Promise)) {
				const value = handlerRejected(child.result);

				resolveChild(value);
			} else {
				this.result
					.then((data) => {
						const value = handlerRejected(data);

						resolveChild(value);
					})
					.catch((err) => {
						const valueErr = handlerRejected(err);

						resolveChild(valueErr);
					});
			}
		}
	};

	then(handlerResolverCase?, handlerRejectedCase?): any {
		let newSyncPromise = null;

		const numberOfArguments = arguments.length;

		const caseForPass = numberOfArguments === 0 || typeof handlerResolverCase !== "function" || (this.state === "rejected" && typeof handlerRejectedCase !== "function");

		if (caseForPass) {
			newSyncPromise = this;
		} else {
			newSyncPromise = new SyncPromise((resolve, reject) => {
				if (this.state === "fulfilled") {
					if (!(this.result instanceof Promise)) {
						const value = handlerResolverCase(this.result);

						resolve(value);
					} else {
						this.result
							.then((data) => {
								const value = handlerResolverCase(data);

								resolve(value);
							})
							.catch((err) => {
								if (typeof handlerRejectedCase !== "function") {
									reject(err);
								} else {
									const valueErr = handlerRejectedCase(err);

									resolve(valueErr);
								}
							});
					}
				} else if (this.state === "rejected") {
					if (!(this.result instanceof Promise)) {
						const value = handlerRejectedCase(this.result);

						resolve(value);
					} else {
						this.result
							.then((data) => {
								const value = handlerRejectedCase(data);

								resolve(value);
							})
							.catch((err) => {
								const valueErr = handlerRejectedCase(err);

								resolve(valueErr);
							});
					}
				} else {
					this.controller.signal.addEventListener("abort", () => {
						const { child } = this.childConfig;

						if (child) {
							this.provocationChild();

							if (child.state === "rejected" && typeof handlerRejectedCase !== "function") {
								reject(child.result);

								return;
							}

							this.applyToChild(resolve, reject, handlerResolverCase, handlerRejectedCase);
						}
					});
				}
			});

			this.setChild(newSyncPromise);
		}

		return newSyncPromise;
	};

	catch(handlerRejectedCase): any {
		let newSyncPromise = null;

		if (arguments.length === 0 || typeof handlerRejectedCase !== "function" || (this.state === "fulfilled" && !(this.result instanceof Promise))) {
			newSyncPromise = this;
		} else {
			newSyncPromise = new SyncPromise((resolve, reject) => {
				if (this.state === "rejected") {
					if (!(this.result instanceof Promise)) {
						const value = handlerRejectedCase(this.result);

						resolve(value);
					} else {
						this.result
							.then((data) => {
								const value = handlerRejectedCase(data);

								resolve(value);
							})
							.catch((err) => {
								const valErr = handlerRejectedCase(err);

								resolve(valErr);
							});
					}
				} else if (this.state === "fulfilled" && this.result instanceof Promise) {
					this.result
						.then((data) => {
							const value = handlerRejectedCase(data);

							resolve(value);
						})
						.catch((err) => {
							const valErr = handlerRejectedCase(err);

							resolve(valErr);
						});
				} else {
					this.controller.signal.addEventListener("abort", () => {
						const { child } = this.childConfig;

						if (child) {
							this.provocationChild();

							if (child.state === "fulfilled" && !(child.result instanceof Promise)) {
								resolve(child.result);

								return;
							}

							this.applyToChild(resolve, reject, handlerRejectedCase, handlerRejectedCase);
						}
					});
				}
			});

			this.setChild(newSyncPromise);
		}

		return newSyncPromise;
	};

	finally(callback): any {
		const newSyncPromise = new SyncPromise((resolve, reject) => {
			if (this.state === "fulfilled" || this.state === "rejected") {
				try {
					const result = callback();

					if (result instanceof Promise || result instanceof SyncPromise) {
						result
							.then((data) => {
								resolve(this.result);
							})
							.catch((err) => {
								reject(err);
							});
					} else {
						resolve(this.result);
					}
				} catch (err) {
					reject(err);
				}
			} else {
				this.controller.signal.addEventListener("abort", () => {
					const { child } = this.childConfig;

					if (child) {
						this.provocationChild();

						try {
							const result = callback();

							if (result instanceof Promise || result instanceof SyncPromise) {
								result
									.then((data) => {
										resolve(this.result);
									})
									.catch((err) => {
										reject(err);
									});
							} else {
								resolve(this.result);
							}
						} catch (err) {
							reject(err);
						}
					}
				});
			}
		});

		this.setChild(newSyncPromise);

		return newSyncPromise;
	};

	static isThenable(data): boolean {
		const isObj = data instanceof Object;

		const isThenableResult = isObj && "then" in data;

		return isThenableResult;
	};

	static resolve(data): any {
		return new SyncPromise((resolve, reject) => {
			if (this.isThenable(data)) {
				data
					.then(
						(data) => {
							resolve(data);
						},
						(err) => {
							reject(err);
						}
					);
			} else {
				resolve(data);
			}
		});
	};

	static reject(errData): any {
		return new SyncPromise((_, reject) => {
			if (this.isThenable(errData)) {
				errData
					.then(
						(data) => {
							reject(data);
						},
						(err) => {
							reject(err);
						}
					);
			} else {
				reject(errData);
			}
		});
	};

	static all(iterable): any {
		const items = [...iterable];

		const result = [];

		let i = 0;

		return new SyncPromise((resolve, reject) => {
			items.forEach((el, index) => {
				const syncPromise = SyncPromise.resolve(el);

				syncPromise
					.then((data) => {
						result[index] = data;

						i++;

						if (result.length === items.length && i === result.length) {
							resolve(result);
						}

						return data;
					})
					.catch((errData) => {
						reject(errData);
					});
			});
		});
	};

	static allSettled(iterable): any {
		const items = [...iterable];

		const result = [];

		let i = 0;

		return new SyncPromise((resolve) => {
			items.forEach((el, index) => {
				const syncPromise = SyncPromise.resolve(el);

				syncPromise
					.then((data) => {
						result[index] = { status: "fulfilled", value: data };

						i++;

						if (result.length === items.length && i === result.length) {
							resolve(result);
						}

						return data;
					})
					.catch((errData) => {
						result[index] = { status: "rejected", reason: errData };

						i++;

						if (result.length === items.length && i === result.length) {
							resolve(result);
						}

						return errData;
					});
			});
		});
	};

	static any(iterable): any {
		const items = [...iterable];

		const resultErr = [];

		let i = 0;

		let flag = true;

		return new SyncPromise((resolve, reject) => {
			items.forEach((el, index) => {
				const syncPromise = SyncPromise.resolve(el);

				syncPromise
					.then((data) => {
						if (flag) {
							flag = false;

							resolve(data);
						}
					})
					.catch((errData) => {
						if (flag) {
							resultErr[index] = errData;

							i++;

							if (items.length === resultErr.length && i === resultErr.length) {
								reject(resultErr);
							}

							return errData;
						}
					});
			});
		});
	};

	static race(iterable): any {
		let flag = true;

		return new SyncPromise((resolve, reject) => {
			for (const el of iterable) {
				const syncPromise = SyncPromise.resolve(el);

				syncPromise
					.then((data) => {
						if (flag) {
							flag = false;

							resolve(data);
						}
					})
					.catch((errData) => {
						if (flag) {
							flag = false;

							reject(errData);
						}
					});
			}
		});
	};
};

export { SyncPromise };
