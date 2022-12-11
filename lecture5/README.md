# Информация по домашкам за 5 лекцию.

## Основные модули.

**Регулярное выражение выдающее false при test, если в строке символы отличные от латинских, цифр, подчеркивания и знака $:** [_перейти_](./task1/regular-expression.ts)

**Регулярное выражение для метода split, где раздилителем будут:.,; или пробелы:** [_перейти_](./task2/regulat-expression-for-split.ts)

**Функция format-fn, которая строковый шаблон заменяет параметрами:** [_перейти_](./task3/format-fn.ts)

**Регулярное выражение для удаления дублированных подстрок:** [_перейти_](./task4/regular-expression-no-dubles.ts)

**Функция, которая считает в строке арифметическое выражение и возвращает строку уже с результатом:** [_перейти_](./task5/calc-fn.ts)

## Тесты.

1. Для регулярного выражения из Задания-1:

```
npx jest ./lecture5/task1/tests/regular-expression.spec.ts
```

2. Для метода split из Задания-2:

```
npx jest ./lecture5/task2/tests/regular-expression-for-split.spec.ts
```

3. Для метода formatFn из Задания-3:

```
npx jest ./lecture5/task3/tests/format-fn.spec.ts
```

4. Для регулярного выражения, которое удаляет все дубли:

```
npx jest ./lecture5/task4/tests/regular-expression-no-dubles.spec.ts
```

5. Для функции calc, которая извлекает арифметические выражения и считает их:

```
npx jest ./lecture5/task5/tests/calc-fn.spec.ts
```
