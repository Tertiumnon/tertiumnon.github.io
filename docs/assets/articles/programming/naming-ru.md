# Именование переменных, объектов/классов, методов и файлов

Название переменной должно быть таким, чтобы было понятно, что она содержит.

Лучше всего создать систему именования переменных, которой будет пользоваться вся команда. Эта система должна подразумевать чёткие и простые правила.

## Именование переменных

### Примитивы

#### Не указывайте тип в названии переменной

Название переменной не должно содержать упоминание её типа. Указание на тип должно быть прописано в типе переменной (это одна из причин, почему НУЖНО использовать типизацию), а получить информацию о типе переменной можно с помощью IDE или интуитивно.

Например, переменная `age` - это с большей степенью вероятности числовой тип данных, а именно `integer`. В названии переменной `name` легко угадывается `string`.

#### Не сокращайте имена переменных

Не пытайтесь постоянно сокращать имена переменных. Более того, старайтесь давать им полный имена, кроме случаев, когда название переменной слишком длинное.

```js
// BAD
const a = 30;

// GOOD
const age = 30;
```

Например, часто используемая переменная `res` не даёт полного понимания, что это такое: `response` или `result`. В коде ниже может быть такая ситуация, где оба этих слова будут присутствовать.

```js
const getUserNames = async () => {
  const result = [];
  const response = await fetch('/users');
  if (response) result = response.data.map(user => user.name);
  return result;
}
```

Какие могут быть примеры правильных сокращений. Допустим вы используете лямбда-функцию.

Если из контекста объекта непонятная сущность, то на всякий случай лучше обойтись без сокращений.

```js
// GOOD
const names = response.data.map(user => user.name);
```

Если же из уже существующих названий переменных всё понятно, то можно и сократить.

```js
// GOOD
const names = users.map(u => u.name);
```

## Именование объектов/классов

Объект (класс) - это всегда набор определённых свойств. Наиболее часто встречающийся пример объекта это `User`.

```ts
class User {
  id: number;
  name: string;
}
```

### Не дублируйте название объекта в его свойства

Самая частая ошибка - это дублирование названия сущности в её свойства. Например, это такие свойства как `userId`, `userName`.

```ts
// BAD
class User {
  userId: number;
  userName: string;

  constructor(userId: number, userName: string) {}
}
```

Получается в итоге "масло масляное", приводящее к многословности.

```ts
const user = new User(1, "Bob");
console.log(user.userName);
```

Более того, каждый раз вы будете гадать, обращаясь к свойству `id` объекта, а как оно записано на этот раз.

Ситуацию улучшить очень просто:

```ts
// GOOD
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {}
}
```

### Объект для параметров

Ещё один распространённый кейс - использование объекта, как хранилища какой-то структуры - это набор параметров, таких как параметры для фильтров.

Объект сам по себе - это единственное число, но внутри него содержится некий список, ряд одноранговых сущностей. Поэтому инстинктивно хочется присвоить аттрибут множественности.

```js
// BAD
const filters = {
  priceFrom: 0,
  priceTo: 99,
};
```

Другой плохой пример - это попытка обозначить в названии переменной тип.

```js
// BAD
const filterObj = {
  priceFrom: 0,
  priceTo: 99,
};

// BAD
const filterArray = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

Всё встаёт на свои места, когда происходит переосмысление сущности. В указанном примере сущность (объект/класс) - это Filter, которая может иметь свойства.

```ts
// GOOD
interface Filter {
  priceFrom: number;
  priceTo: number;
}

// GOOD
const filter: Filter = {
  priceFrom: 0,
  priceTo: 99,
};
```

Или же можно пойти дальше.

```ts
// GOOD
interface Filter {
  name: string;
  valueFrom: string;
  valueTo: string;
}

const priceFilter: Filter = {
  name: "Price",
  valueFrom: 0,
  valueTo: 99
};

const filters = [priceFilter];
```

Или вот такой пример реализации объекта Фильтры.

```ts
// GOOD
const filters = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

An advantage of using "List"-word is that you can use singular form of entity. For example:

```ts
const userList = [];

function findUserByName(name: string) {
  return userList.find(user => user.name === name);
}
```

## Methods naming

### Use "get" word, if you want to return something EXISTING

```ts
function getAppUser(): User {}
```

#### Use "set" word, if you want to set value for something

```ts
function setAppUser(user: User): void {}
```

#### Use "find" word, if you want to find something, using filters, but you're not sure about the result

```ts
function findUser(filters: Filter[]): User | null {}
```

### Classes naming

#### Use can use reductions for common keywords in classes names

```text
UserController -> UserCtrl
UserService -> UserSvc
```

## Именование файлов

Названия файлов должны соответствовать названию класса и быть в единственном числе, если это сущность.

```ts
// user.ts
class User {}
```

Если речь про `view` (страницу), то это может быть абсолютно любое название. Например, страница находится по адресу `/users`, значит и компонент/класс будет называться `users.component.ts`.
