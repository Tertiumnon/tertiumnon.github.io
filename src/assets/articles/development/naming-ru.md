# Naming for variables, methods and classes

Название переменной должно быть таким, чтобы было понятно, что она содержит.

Лучше всего создать систему именования переменных, которой будет пользоваться вся команда. Эта система должна подразумевать чёткие и простые правила.

## File naming

Названия файлов должны соответствовать названию класса и быть в единственном числе, если это сущность.

```ts
// user.ts
class User {}
```

Любой файл должен иметь свою директорию с тем же самым названием.

```ts
// user/user.ts
class User {}
```

Все файлы в директории должны иметь то же название (относиться к одной сущности), но различаться по назначению (вторая часть названия файла, отделённая точкой).

```text
user/
  user.type.ts
  user.service.ts
  user.component.ts
```

## Primitive variable naming

```ts
// BAD
var ageNumber = 30;

// BAD
var ageNum = 30;

// BAD
var ageN = 30;

// BAD
var a = 30;

// GOOD
var age = 30;
```

## Object variable naming

Object variable must be singular, if we're talking about object with properties.

Don't use special words to describe object type, because your IDE already knows the type.

```js
// BAD
const filters = {
  priceFrom: 0,
  priceTo: 99,
};

// BAD
const filterObj = {
  priceFrom: 0,
  priceTo: 99,
};

// GOOD
const filter = {
  priceFrom: 0,
  priceTo: 99,
};

// BAD
const filterArray = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];

// BAD
const filterArr = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

You should decide, how to create names for arrays. For example, Bob Martin ("Clean Code") doesn't recommend to use keyword "List" because it can be interpreted as type (for example, type "List" in C#). But I think that you must not use type-keywords in names at all, so you can use "List" in names when you want to show that it's a list of some items (array).

```ts
// GOOD
const filters = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];

// GOOD
const filterList = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

An advantage of using "List"-word is that you can use singular form of entity. For example:

```ts
var userList = [];

function findUserByName(name: string) {
  return userList.find(user => user.name === name);
}
```

## Methods naming

### Use "get" word, if you want to return something EXISTING

```ts
function getAppUser(): User {}
```

### Use "set" word, if you want to set value for something

```ts
function setAppUser(user: User): void {}
```

### Use "find" word, if you want to find something, using filters, but you're not sure about the result

```ts
function findUser(filters: Filter[]): User | null {}
```

## Classes naming

### Use can use reductions for common keywords in classes names

```text
UserController -> UserCtrl
UserService -> UserSvc
```
