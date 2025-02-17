# Classes and methods

## "Find"-methods

If we can't find something and return type is a primitive, we should return the same type primitive.

For example, basic JS methods:

```ts
"car".search("a"); // 1
"car".search("c"); // 0
"car".search("d"); // -1
```

Or may be:

```ts
function getUserLastName(user: User): string {}
```

If we can't find something and return type is an object, we should return `null`.

```ts
function findUser(filters: Filter[]): User | null {}
```

If you work with JS, you can use `undefined` value. But when you're getting data from API, you can't get `undefined`. So, you will get `null` value. That's the reason, why I think that `null` value is more preferable.

```ts
function findUser(filters: Filter[]): User | null {}
```

And the last case is an array. If you can't find, you will get an empty array.

```ts
function findUsers(filters: Filter[]): User[] {}
```

### If you want to return an array of entities

```ts
function getUsers(filters: Filter[]): User[] {}
```

### Throwing errors in methods

How do you think, are these methods correct?

```ts
// if we know that the first ID is 0
function getUserIdByName(name: string): number {
  return userList.find(user => user.name === name)?.id || -1;
}

function getUserNameById(id: number): string {
  return userList.find(user => user.id === id)?.name || "";
}
```

Let's create more correct methods!

```ts
function findUserIdByName(name: string): number {
  const user = userList.find(user => user.name === name);
  if (!user) throw new Error(`User with name ${name} was not found.`);
  return user.id;
}

function findUserNameById(id: number): string {
  const user = userList.find(user => user.id === id);
  if (!user) throw new Error(`User with id ${id} was not found.`);
  return user.name;
}
```

Is that right? I don't think so.

## Method as a part of class

Если метод является частью класса, то в целях сокращения лучше сократить названия методов, исходя из того, что нам уже известна сущность и нам не нужно повторяться.

```ts
class UserService {
  find(): User[] {}
}
```

## API classes and methods

### Typical CRUD service

```ts
// GOOD
class UserService {
  find(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}

// NOT SO GOOD
class UserService {
  findAll(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  findUnique(filters: Filter[]): User {} // find unique user (using parameters/filters)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}

// BAD, because it's complicated
class UserService {
  findAll(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  findUnique(filters: Filter[]): User {} // find unique user (using parameters/filters)
  search(query: string): User[] {} // find unique user (using parameters/filters)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}
```

In case when we use a special word "find", we understand that we want to find something, but we don't know the result. If we don't get it, we should expect an empty array `[]` for "findAll" and `null` - for "find" methods.

In case when we use a special word "get", we understand that we want to get existing object with unique identifier. If we don't get it, we should expect an error.

Methods `create`, `get`, `update` and `delete` are typical methods for CRUD operations. Every time when we use these methods, we always use ID of existing object (except `create`), so we don't need to duplicate "ByID" in these methods.

Если класс является утилитарным, то лучше конкретизировать методы, так как они могут быть самые разнообразные.

```ts
class UserUtility {
  findAllFriends() {}
}
```

### Nested methods

Don't create nested methods with one nested method inside - it's overcomplicated for understanding.

```ts
function getUsers() {
  return UserService.getAll();
}
```

Unfortunately, sometimes we need to use nested methods in cases when nested method is private.

```ts
class SomeComponent {
  construction(private userService: UserService) {}

  public getUsers() {
    return this.userService.getAll();
  }
}
```
