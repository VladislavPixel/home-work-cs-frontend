import isDigit from "../is-digit";

describe("Проверяю функцию isDigit:", () => {
  test("Вызываю функцию со значениями, которые вернут true.", () => {
    expect(isDigit("Ⅻ")).toBe(true);
    expect(isDigit("123")).toBe(true);
    expect(isDigit("ⅩⅩⅧ")).toBe(true);
    expect(isDigit("𑁦𑁧𑁩𑁯")).toBe(true);
    expect(isDigit("৯৩৬")).toBe(true);
    expect(isDigit("፼፵፫")).toBe(true);
  });

  test("Вызываю функцию со значениями, которые вернут false.", () => {
    expect(isDigit("😍")).toBe(false);
    expect(isDigit("lbn")).toBe(false);
    expect(isDigit("12Ⅷ৯")).toBe(false);
  });
});
