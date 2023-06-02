class Fetch {
	static methodSave: string = "GET";

	static urlSave: string = "";

	static querySave: Record<string, any> = {};

	static contentTypeSave: string = "application/json";

	static bodySave: any = null;

	static method(methodName: string): typeof Fetch {
		return class extends this {
			static override methodSave: string = methodName;
		};
	};

	static url(urlStr: string): typeof Fetch {
		return class extends this {
			static override urlSave: string = urlStr;
		};
	};

	static query(key: string, value: any): typeof Fetch {
		const newQueryStore: Record<string, any> = {...this.querySave, [key]: value};

		return class extends this {
			static override querySave: Record<string, any> = newQueryStore;
		};
	};

	static body(contentType: string, data: any): typeof Fetch {
		return class extends this {
			static override contentTypeSave: string = contentType;

			static override bodySave: any = data;
		};
	};

	static send(): Promise<Response> {
		return new Promise((resolve, reject) => {
			if (this.urlSave === "") {
				reject(new Error("Your url is not correct!"));
			}

			const url = this.urlSave + (Object.keys(this.querySave).length !== 0 ? "?" + new URLSearchParams(this.querySave).toString() : "");

			if (this.bodySave === null || this.bodySave === undefined || this.methodSave === "GET") {
				console.log("ЗАПРОС В GET");

				resolve(fetch(url, { method: this.methodSave }));
			} else {
				resolve(fetch(url, {
					method: this.methodSave,
					headers: {
						"Content-Type": this.contentTypeSave
					},
					body: JSON.stringify(this.bodySave)
				}));
			}
		});
	};
};

//const myUrlReq = Fetch
//  .method("GET")
//  .url("https://jsonplaceholder.typicode.com/comments");

//myUrlReq
//	.query("postId", 1)
//  .send()
//  .then((data) => {
//		console.log(data, "Данные пришли");
//	});

export { Fetch };
