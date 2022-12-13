function calc(str: string): string {
	function priorityCalc(strValueForPriorityCalc: string): string {
		const regExp = /(\d+)(?: )*(\*\*|\*|\/)(?: )*(\d+)/;

		const result: string = strValueForPriorityCalc.replace(
			regExp,
			(_: string, $1: string, $2: string, $3: string): string => {
				switch (`${$2}`) {
					case "**":
						return `${Number(`${$1}`) ** Number(`${$3}`)}`;
					case "*":
						return `${Number(`${$1}`) * Number(`${$3}`)}`;
					case "/":
						return `${Number(`${$1}`) / Number(`${$3}`)}`;
					default:
						throw new Error("Something wrong...");
				}
			}
		);

		if (result === strValueForPriorityCalc) {
			return result;
		}

		return priorityCalc(result);
	}

	function notPriorityCalc(strValueForNotPriorityCalc: string): string {
		const regExp = /(\d+)(?: )*(\+|\-)(?: )*(\d+)/;

		const result: string = strValueForNotPriorityCalc.replace(
			regExp,
			(_: string, $1: string, $2: string, $3: string): string => {
				switch (`${$2}`) {
					case "+":
						return `${Number(`${$1}`) + Number(`${$3}`)}`;
					case "-":
						return `${Number(`${$1}`) - Number(`${$3}`)}`;
					default:
						throw new Error("Something wrong...");
				}
			}
		);

		if (result === strValueForNotPriorityCalc) {
			return result;
		}

		return notPriorityCalc(result);
	}

	function priorityPars(strForPriorityPars: string): string {
		const regExp =
			/(?:(?:\((?: )*\d+(?: )*(\*\*|\*|\/|\+|\-)(?: )*\d+(?: )*((\*\*|\*|\/|\+|\-)(?: )*\d+(?: )*)*\))|(?:\d+(?: )*(\*\*|\*|\/)(?: )*\d+((?: )*(\*\*|\*|\/)(?: )*\d+)*))/gims;

		const resultPriority: string = strForPriorityPars.replace(
			regExp,
			(strValue: string): string => {
				if (strValue[0] !== "(") {
					return `${priorityCalc(strValue)}`;
				}

				let withoutBracketsStrValue: string = strValue.replace(/[\(\)]/g, "");

				if (/(\*\*|\*|\/)/g.test(withoutBracketsStrValue)) {
					withoutBracketsStrValue = priorityPars(withoutBracketsStrValue);
				}

				return `${notPriorityCalc(withoutBracketsStrValue)}`;
			}
		);

		if (resultPriority === strForPriorityPars) {
			return resultPriority;
		}

		return priorityPars(resultPriority);
	}

	const resultPriorityPars: string = priorityPars(str);

	function notPriorityPars(strForNotPriorityPars: string): string {
		const regExp = /\d+( )*(\+|\-)( )*\d+( )*((\+|\-)( )*\d+( )*)*/gims;

		const resultNotPriority: string = strForNotPriorityPars.replace(
			regExp,
			(strValue: string): string => {
				return `${notPriorityCalc(strValue)}`;
			}
		);

		return resultNotPriority;
	}

	return notPriorityPars(resultPriorityPars);
}

export { calc };

// Для примера, реализация с учетом рефакторинга
function calc2(str: string): string {
	const regExp: RegExp = /(\(|\-|)\d+(( |)(\*\*|\*|\/|\-|\+)( |)(\(|\-|)\d+(\)|))+/g;

	const result = str.replace(regExp, (strValue: string): string => {
		const auxiliaryFn = new Function("strTarget", "return eval(strTarget);");

		return auxiliaryFn(strValue);
	});

	return result;
}

calc2(`
Какой-то текст (10 + 15 - 24) ** 2 + (1 + 15)
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
Еще какой-то невероятный текст 4 * 2 / 2 * 7 * 3
Еще какое-то деление 10 / 5
Еще какой-то текст (1 + 1 + 10 / 2 + 12 * 2) * 2
Еще арифметика 2 * 2 * 2 / 2 + 1 + 2
Более сложная строка с вложенностью (10 + 10 + (10 - 1) * 2 + 1) + 5 - 15
`);

export { calc2 };
