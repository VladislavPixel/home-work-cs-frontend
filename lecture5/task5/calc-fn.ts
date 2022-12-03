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
