import recBinarySearch from "../rec-binary-search";

describe("Проверяю рекурсивную функцию бинарного поиска - recBinarySearch: ", () => {
  test("Вызываю функцию.", () => {
    const arr = [-432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98];

    expect(recBinarySearch(4, arr)).toBe(8);
    expect(recBinarySearch(6, arr)).toBe(10);
    expect(recBinarySearch(98, arr)).toBe(11);
    expect(recBinarySearch(0, arr)).toBe(1);
    expect(recBinarySearch(-432, arr)).toBe(0);
    expect(recBinarySearch(-90, arr)).toBe(-1);
    expect(recBinarySearch(95, arr)).toBe(-1);
    expect(() => recBinarySearch(777, arr)).toThrow(
      "Search value is not in array range."
    );
  });
});
