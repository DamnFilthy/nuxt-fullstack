# Шаблон для быстрого развертывания и разработки fullstack приложений

### За основу взяты две статьи на habr

- [Часть 1: Nuxt as fullstack server: frontend + backend API Server](https://habr.com/ru/post/501652)
- [Часть 2: Additional SSR performance with Nuxt fullstack server](https://habr.com/ru/post/501688)

#### В проекте используется Vuetify

#### Структура проекта
| Папка | Назначение    | Описание   |
| :---:   | :---: | :---: |
| api | Контроллеры нашего API   | Работа с данными   |
| serverMiddleware | API Server   | Обработка внешних клиентских запросов   |
| database | База данных   | Модели и миграции   |
| plugins | Плагины для работы приложения   | Добавлены инъекции зависимостей $api и $server и подключение к БД   |

- Все запросы вида `http://<server_name>/api/controller_name/method_name` будут искать в папке `/api/`
  файл `controller_name.js`, который экспортирует функцию с именем `method_name` и запускать её
  с параметрами первым аргументом

#### Функция `$api` на сервере  напрямую вызывает метод контроллера, а на клиенте `$api` отправляет `http` запрос через `axios`

- Создает две функции $api - на клиенте и сервере, работает по разному в зависимости от контекста (сервер/клиент)
- При рендере на сервере, не выполняется `http` запрос на себя же,
  а просто подключает через `require` файл `/api/controller_name.js` и вызовет метод `method_name()`.
  Однако при работе клиента в браузере, то те же самые данные запросятся через `http`.

#### Итог
- Минимальными изменениями можно ускорить серверный рендеринг более чем в 50 раз, на живом примере рендеринг страницы у меня ускорялся в ~1.7 раза
- Существенно сократился расход ресурсов Node HTTP сервера
- В оптимизированном виде единственный инстанс Nuxt'а должен выдержать нагрузку небольших и средних проектов

