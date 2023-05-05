# Информация по домашкам за 10 лекцию.

## Основные модули.

**Функции on/once, которые принимают любой источник событий или событие и возвращают асинхронный итератор:** [_перейти_](./task1/on.ts) [_перейти_](./task1/once.ts)

**Функции filter/map/seq/take/any возвращающие асинхронный итератор:** [_перейти_](./task2/any.ts) [_перейти_](./task2/filter.ts) [_перейти_](./task2/map.ts) [_перейти_](./task2/seq.ts) [_перейти_](./task2/take.ts)

**Функции every/forEach/onlyEvent/repeat для реализации композиции drag and drop DND:** [_перейти_](./task3/every.ts) [_перейти_](./task3/for-each-async.ts) [_перейти_](./task3/only-event.ts) [_перейти_](./task3/repeat.ts)

```
const dnd = repeat(() => filter(
	seq(
		once(box, "mousedown"),

		every(
			any(
				on(block, "mousemove"),
				on(box, "mouseup")
			),

			onlyEvent("mousemove")
		)
	),

	onlyEvent("mousemove")
));
```

## Тесты.
