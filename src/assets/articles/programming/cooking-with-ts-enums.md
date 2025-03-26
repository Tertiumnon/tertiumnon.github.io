# Cooking with TypeScript enums

Periodically I hear that something wrong with TypeScript enums. But if you understand how it works - it's not an issue for you.

The usage is very simple:

```ts
enum Role {
  None = 0,
  Moderator = 1,
  Admin = 2,
}
```

And we have a good news here - we can use string values in TypeScript! For instance, C# enums can't work work with string values.

```ts
enum UserRole {
  None = "",
  Moderator = "moderator",
  Admin = "admin",
}
```

## Pros and cons of enums

### Excessive JavaScript code after compilation

I think the claim that TypeScript enums produce excessive JavaScript code is somewhat overstated. Have you ever wondered how much code your compiler generates? I highly doubt it. But when it comes to types, you somehow think differently. Don't you find that strange?

Let's take a look on generated JS code.

```js
var Role;
(function (Role) {
    Role[Role["None"] = 0] = "None";
    Role[Role["Moderator"] = 1] = "Moderator";
    Role[Role["Admin"] = 2] = "Admin";
})(Role || (exports.Role = Role = {}));
```

Looks ugly but it doesn't produce any "terrible" effects.

We can continue our investigation. Let's create a file with `enum` and a file with `type`.

```ts
type RoleType = "" | "moderator" | "admin";
```

And than we can import both files to apply values from both kinds.

```ts
import { UserRole } from './enum';
import { RoleType } from './type';

const role = UserRole.Moderator;
const roleType: RoleType = "moderator";
```

The result in JS will be:

```js
var enum_1 = require("./enum");

var role = enum_1.UserRole.Moderator;
var roleType = "moderator";
```

You see here that `enum` produce a variable with values but `type` don't. It means that `enum` don't repeat itself. It's an Object with properties.

Let's create a class - another TypeScript feature.

```ts
class User {
  name: string;
  email: string;
}
```

And you will get the next compiled JS code:

```js
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
```

Looks ugly too, isn't it? More code, more problems? I don't think so!

I worked with many projects and teams, and you should know that very common problems are:

- Over-complicated code (ignoring all principles clean coding)
- Inefficient code (CPU and memory loading)
- Environment issues (caching invalidation, network loading, etc.)
- Legacy dependencies (security issues, difficulties with upgrading)

### Non-obviousness of usage

The most common example of incorrect use of `enums` is shown in the code below.

```ts
enum UserRole {
  Admin,
  Moderator,
}
```

And this is a real problem here. Problem for those who don't understand some JS and TS nuances.

```ts
// you will get a logically incorrect result
const ROLES_VALUES = Object.values(UserRole); // ["Admin", "Moderator", 0, 1]
```

This is the reason why **we always must use values for enums**.

### A good part of `enums`

`Enums` can help you create arrays and objects that we might need in other parts of the project.

```ts
const isRoleValueCorrect = (value: UserRole) => ROLE_VALUES.includes(value);
```

Or you can create options for select:

```ts
const options = Object.entries(UserRole).map(arr => ({label: arr[0], value: arr[1]}));
/*
[{
  "label": "None",
  "value": ""
}, {
  "label": "Moderator",
  "value": "moderator"
}, {
  "label": "Admin",
  "value": "admin"
}] 
 */
```

## Conclusions

TypeScript `enums` is not a "bad" feature.

In some case it's confusing but only if you don't understand how to works with that.

This is convenient if you want to create related data structures.
