# Информация по домашкам за 8 лекцию.

## Основные модули.

**Контейнер Result с двумя состояниями Error и Ok. Контейнер обладает характеристиками монады и функтора.:** [_перейти_](./task1/container-result.ts)

**Аналог async/await для контейнера Result на генераторе.:** [_перейти_](./task2/executor.ts)

**Аналог async/await универсальный, для всех контейнеров с методом then().:** [_перейти_](./task3/executor-universal.ts)

## Тесты.

1. Для функции контейнера Result из Задания-1:

```
npx jest ./lecture8/task1/tests/container-result.spec.ts
```

2. Для функции executor, которая дает аналог async/await только Result из Задания-2:

```
npx jest ./lecture8/task2/tests/executor.spec.ts
```

3. Для функции executorUniversal, которая дает аналог async/await для всех контейнеров, у которых есть метод then():

```
npx jest ./lecture8/task3/tests/executor-universal.spec.ts
```
