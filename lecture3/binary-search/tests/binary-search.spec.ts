import binarySearch from "../binary-search";

describe("Проверяю классическую функцию бинарного поиска - binarySearch: ", () => {
  test("Вызываю функцию.", () => {
    const arr = [-432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98];

    expect(binarySearch(4, arr)).toBe(8);
    expect(binarySearch(6, arr)).toBe(10);
    expect(binarySearch(98, arr)).toBe(11);
    expect(binarySearch(0, arr)).toBe(1);
    expect(binarySearch(-432, arr)).toBe(0);
    expect(binarySearch(-90, arr)).toBe(-1);
    expect(binarySearch(95, arr)).toBe(-1);
    expect(() => binarySearch(777, arr)).toThrow(
      "Search value is not in array range."
    );
  });
});
