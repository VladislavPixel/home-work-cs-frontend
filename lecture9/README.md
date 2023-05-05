# Информация по домашкам за 9 лекцию.

## Основные модули.

**Функция sleep, которая принимает заданное количество миллисекунд и возвращает Promise.:** [_перейти_](./task1/sleep.ts)

**Функция timeout, которая принимает Promise и заданное количество миллисекунд и возвращает Promise:** [_перейти_](./task2/timeout.ts)

**Реализация setImmediate/clearImmediate по аналогии с Node.js.:** [_перейти_](./task3/set-immediate.ts) [_перейти_](./task3/clear-immediate.ts)

**Функция promisify, которая принимает функцию, где последний аргумент thunk-callback и возвращает новую функцию. Новая функция возвращает промис.:** [_перейти_](./task4/promisify.ts)

**Реализация SyncPromise, класс аналогичный нативному Promise, но работающий синхронно, если это возможно:** [_перейти_](./task56/sync-promise.ts)

**Реализация функции AllLimit, которая принимает iterable функций, возвращающих Promise (или обычные значения) и лимит одновременных Promise. В pending одновременно не находится больше заданного лимита:** [_перейти_](./task7/all-limit.ts)

## Тесты.