import type { IElementRange } from "../type";
import binarySearchForIsDigitFn from "../binary-search-for-is-digit-fn";

describe("Проверяю функцию binarySearchForIsDigitFn:", () => {
  test("Вызываю функцию, чтобы спровоцировать исключение.", () => {
    const arrRanges: IElementRange[] = [
      { leftBorder: 48, rightBorder: 57 },
      { leftBorder: 2534, rightBorder: 2543 },
      { leftBorder: 4969, rightBorder: 4988 },
      { leftBorder: 8544, rightBorder: 8559 },
      { leftBorder: 69734, rightBorder: 69743 }
    ];

    expect(() => binarySearchForIsDigitFn(155353, arrRanges)).toThrow(
      "Search value is not in array range."
    );
  });

  test("Вызываю функцию с корректными значениями.", () => {
    const arrRanges: IElementRange[] = [
      { leftBorder: 48, rightBorder: 57 },
      { leftBorder: 2534, rightBorder: 2543 },
      { leftBorder: 4969, rightBorder: 4988 },
      { leftBorder: 8544, rightBorder: 8559 },
      { leftBorder: 69734, rightBorder: 69743 }
    ];

    expect(binarySearchForIsDigitFn(49, arrRanges)).toBe(0);
    expect(binarySearchForIsDigitFn(69743, arrRanges)).toBe(4);
    expect(binarySearchForIsDigitFn(8548, arrRanges)).toBe(3);
    expect(binarySearchForIsDigitFn(2540, arrRanges)).toBe(1);
    expect(binarySearchForIsDigitFn(4980, arrRanges)).toBe(2);
  });

  test("Вызываю функцию с некорректными значениями.", () => {
    const arrRanges: IElementRange[] = [
      { leftBorder: 48, rightBorder: 57 },
      { leftBorder: 2534, rightBorder: 2543 },
      { leftBorder: 4969, rightBorder: 4988 },
      { leftBorder: 8544, rightBorder: 8559 },
      { leftBorder: 69734, rightBorder: 69743 }
    ];

    expect(binarySearchForIsDigitFn(3000, arrRanges)).toBe(-1);
    expect(binarySearchForIsDigitFn(5555, arrRanges)).toBe(-1);
    expect(binarySearchForIsDigitFn(70, arrRanges)).toBe(-1);
    expect(binarySearchForIsDigitFn(59000, arrRanges)).toBe(-1);
    expect(binarySearchForIsDigitFn(280, arrRanges)).toBe(-1);
  });
});
