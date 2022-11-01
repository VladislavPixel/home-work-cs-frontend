import binarySearchForIsDigitFn from "./binary-search-for-is-digit-fn";
import type { IElementRange } from "./type";

function isDigit(str: string): boolean {
  const arrRanges: IElementRange[] = [
    { leftBorder: 48, rightBorder: 57 },
    { leftBorder: 2534, rightBorder: 2543 },
    { leftBorder: 4969, rightBorder: 4988 },
    { leftBorder: 8544, rightBorder: 8559 },
    { leftBorder: 69734, rightBorder: 69743 }
  ];

  try {
    const elements = [...str];

    const index = binarySearchForIsDigitFn(
      elements[0].codePointAt(0),
      arrRanges
    );

    if (index === -1) {
      return false;
    }

    if (elements.length === 1) {
      return true;
    }

    const selectedRange = arrRanges[index];

    for (const element of elements) {
      const code = element.codePointAt(0);

      if (
        code === undefined ||
        code < selectedRange.leftBorder ||
        code > selectedRange.rightBorder
      ) {
        return false;
      }
    }
  } catch (err) {
    return false;
  }

  return true;
}

export default isDigit;
