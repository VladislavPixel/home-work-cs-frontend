export interface IHashTable {
	[key: PropertyKey]: unknown;
}

function formatFn(str: string, parameters: IHashTable): string {
	const result = str.replace(/\$\{(\w+)\}/g, (str: string, q1: string): string => {
		if (q1 in parameters) {
			return `${parameters[q1]}`;
		}

		return str;
	});

	return result;
}

export { formatFn };
