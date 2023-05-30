import { IResponseEssence } from "../types";

class ResponseEssence implements IResponseEssence {
	response: Response;

	constructor(response: Response) {
		this.response = response;
	};

	async decoding(): Promise<Response> {
		console.log("Некоторое декодирование данных", this.response);

		return this.response;
	};

	async jsonUnpacking(): Promise<any> {
		return await this.response.json();
	};

	async textUnpacking(): Promise<string> {
		return await this.response.text();
	};

	async arraybufferUnpacking(): Promise<ArrayBuffer> {
		return await this.response.arrayBuffer();
	};

	async blobUnpacking(): Promise<Blob> {
		return await this.response.blob();
	};

	async formDataUnpacking(): Promise<Response> {
		console.log("доступно для результата fetch");

		return this.response;
	};

	async documentUnpacking(): Promise<Response> {
		console.log("доступно только для XMLHttpRequest");

		return this.response;
	};
};

export type ResponseEssenceClass = typeof ResponseEssence;

export { ResponseEssence };
