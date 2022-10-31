import binarySearch from "../../lecture3/binary-search/binary-search";

function isDigit(str: string): boolean {
  const arrIndianNumbers = new Array(10);

  const arrRomanNumerals = new Array(16);

  const arrArabicNumerals = new Array(10);

  const arrBengaliNumbers = new Array(10);

  const initializationDataForArray = (
    leftBorder: number,
    rightBorder: number,
    targetArr: number[]
  ): void => {
    for (let m = rightBorder; m >= leftBorder; m--) {
      targetArr[m - leftBorder] = m;
    }
  };

  initializationDataForArray(8544, 8559, arrRomanNumerals);

  initializationDataForArray(69734, 69743, arrIndianNumbers);

  initializationDataForArray(48, 57, arrArabicNumerals);

  initializationDataForArray(2534, 2543, arrBengaliNumbers);

  try {
    if (binarySearch(str.codePointAt(0), arrIndianNumbers) !== -1) {
      if (str.length === 1) {
        return true;
      }

      const elements = [...str];

      for (const element of elements) {
        const result = binarySearch(element.codePointAt(0), arrIndianNumbers);

        if (result === -1) {
          return false;
        }
      }

      return true;
    }
  } catch (err) {
    console.log("Переданные символы не подходят под Индийские цифры!");
  }

  try {
    if (binarySearch(str.codePointAt(0), arrRomanNumerals) !== -1) {
      if (str.length === 1) {
        return true;
      }

      const elements = [...str];

      for (const element of elements) {
        const result = binarySearch(element.codePointAt(0), arrRomanNumerals);

        if (result === -1) {
          return false;
        }
      }

      return true;
    }
  } catch (err) {
    console.log("Переданные символы не подходят под Римские цифры!");
  }

  try {
    if (binarySearch(str.codePointAt(0), arrArabicNumerals) !== -1) {
      if (str.length === 1) {
        return true;
      }

      const elements = [...str];

      for (const element of elements) {
        const result = binarySearch(element.codePointAt(0), arrArabicNumerals);

        if (result === -1) {
          return false;
        }
      }

      return true;
    }
  } catch (err) {
    console.log("Переданные символы не подходят под Арабские цифры!");
  }

  try {
    if (binarySearch(str.codePointAt(0), arrBengaliNumbers) !== -1) {
      if (str.length === 1) {
        return true;
      }

      const elements = [...str];

      for (const element of elements) {
        const result = binarySearch(element.codePointAt(0), arrBengaliNumbers);

        if (result === -1) {
          return false;
        }
      }

      return true;
    }
  } catch (err) {
    console.log("Переданные символы не подходят под Бенгальские цифры!");
  }

  return false;
}

export default isDigit;
