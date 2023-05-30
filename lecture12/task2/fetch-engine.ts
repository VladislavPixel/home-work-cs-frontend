function fetchEngine(url: string, params: RequestInit): Promise<Response> {
	return new Promise(async (resolve, reject) => {
		try {
			const responce: Response = await fetch(url, params);

			resolve(responce);

		} catch(err) {
			reject(err);
		}
	});
};

export { fetchEngine };
