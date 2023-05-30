import { ParamsRequest } from "./params-request";
import { ICache, ICacheConcrate, EngineRequestFNType, IResponseEssence } from "../types";
import { ResponseEssenceClass } from "./response-essense";

class RequestEssense {
	static url: null | string = null;

	static methodForRequest: string = "GET";

	static instanceCache: null | ICache & ICacheConcrate = null;

	static keyCache: null | string = null;

	static dataType: null | string = null;

	static strategyResponse: null | ResponseEssenceClass = null;

	static strategyRequestFN: null | EngineRequestFNType = null;

	static savePayload: null | any = null;

	static get post(): typeof RequestEssense {
		return class extends this {
			static override methodForRequest = "POST";
		};
	};

	static get get(): typeof RequestEssense {
		return class extends this {
			static override methodForRequest = "GET";
		};
	};

	static get jsonFormat(): typeof RequestEssense {
		return class extends this {
			static override dataType = "json";
		};
	};

	static setUrl(urlString: string): typeof RequestEssense {
		return class extends this {
			static override url = urlString;
		};
	};

	static body<T extends any>(payload: T): typeof RequestEssense {
		return class extends this {
			static override savePayload = payload;
		};
	};

	static using(strategyRequestFN: EngineRequestFNType): typeof RequestEssense {
		return class extends this {
			static override strategyRequestFN = strategyRequestFN;
		};
	};

	static cache(instanceCache: ICache & ICacheConcrate): typeof RequestEssense {
		return class extends this {
			static override instanceCache = instanceCache;
		};
	};

	static setResponse(strategyResponse: ResponseEssenceClass): typeof RequestEssense {
		return class extends this {
			static override strategyResponse = strategyResponse;
		};
	};

	static setKeyForCache(key: string): typeof RequestEssense {
		return class extends this {
			static override keyCache = key;
		};
	};

	static leadFormat(payload: any): any {
		let result = payload;

		switch(this.dataType) {
			case "json":
				result = JSON.stringify(payload);
			break;
		}

		return result;
	};

	static async create(): Promise<IResponseEssence | unknown> {
		if (this.keyCache !== null) {
			const dataCache = this.instanceCache.get(this.keyCache);

			if (dataCache && (dataCache instanceof Response) && this.strategyResponse) {
				return new this.strategyResponse(dataCache);
			}

			if (dataCache) {
				return dataCache;
			}
		}

		if (this.strategyRequestFN === null) {
			throw new Error("strategy request is not defined");
		}

		const params = new ParamsRequest(
			this.methodForRequest,
			this.leadFormat(this.savePayload)
		);

		let data = await this.strategyRequestFN(this.url, params);

		if (this.instanceCache) {
			this.instanceCache.set(0, data);
		}

		if (this.strategyResponse) {
			return new this.strategyResponse(data);
		}

		return data;
	};
};

export { RequestEssense };
