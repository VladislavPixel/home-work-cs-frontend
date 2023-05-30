function xhrEngine(url: string, params: RequestInit): Promise<Response> {
	let xhr = new XMLHttpRequest();

	xhr.open(params.method || "GET", url, true);

	xhr.responseType = "blob";

	return new Promise((resolve, reject) => {
		const body: BodyInit = params.body;

		if (body !== null && !(body instanceof ReadableStream)) {
			xhr.send(body);

		} else {
			xhr.send();
		}

		xhr.onload = function() {
			if (xhr.status !== 200) {
				reject(new Error("Ошибка запроса."));

			} else {
				const res: Response = new Response(xhr.response.stream());

				resolve(res);
			}
		};

		xhr.onerror = function(err) {
			reject(err);
		};

		xhr.onprogress = function(event) {
			console.log(`Загружено ${event.loaded} из ${event.total}`);
		};
	});
};

export { xhrEngine };
