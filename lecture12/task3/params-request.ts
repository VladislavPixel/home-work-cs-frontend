class ParamsRequest implements RequestInit {
	method: string;

	body?: BodyInit | null;

	constructor(method: string, body: BodyInit | null) {
		this.method = method;

		if (body) {
			this.body = body;
		}
	};
};

export { ParamsRequest };
