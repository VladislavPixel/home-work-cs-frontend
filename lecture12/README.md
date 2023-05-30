# Информация по домашкам за 12 лекцию.

## Основные модули.

**Классы для кеширования любых значений использующие алгоритмы LRU, MRU и Never (заглушка):** [_перейти_](./task1/lru-cache.ts) [_перейти_](./task1/mru-cache.ts) [_перейти_](./task1/never-cache.ts)

**Стратегии для отправки данных через XMLHttpRequest и fetch в виде функций, которые возвращают Promise:** [_перейти_](./task2/xhr-engine.ts) [_перейти_](./task2/fetch-engine.ts)

**Классы Request и Response для создания запросов по заданным параметрам и обработки ответов. При создании запроса можно указать движок запроса и стратегию кеширования.:** [_перейти_](./task3/request-essense.ts) [_перейти_](./task3/response-essense.ts)

```
RequestEssense.using(fetchEngine).cache(new LRUCache(5)).post.jsonFormat.body({ name: "Maxim" }).setUrl("//my-url-request").setResponse(ResponseEssence).setKeyForCache("nimbus").create().then(console.log);
```

## Тесты.
