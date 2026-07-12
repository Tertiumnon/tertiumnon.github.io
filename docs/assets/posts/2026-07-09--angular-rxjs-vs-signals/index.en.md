---
publishedAt: 2026-07-09
category: Programming
tags: ["Angular","Frontend","JavaScript","Web Development"]
---

# Angular RxJS vs Signals in 2026

With Angular 22 fully embracing the "Signal-first" era, the question every Angular developer asks is: **Should I still use RxJS?** The short answer: **Yes, but strategically.** Signals and RxJS are complementary tools for different reactive problems.

## What Are Signals?

Signals are lightweight wrappers around values that enable fine-grained reactivity. Unlike Observables, signals are **synchronous** and **always have a current value**.

```typescript
import { signal, computed } from '@angular/core';

// Create a writable signal
const count = signal(0);

// Read the value by calling the signal
console.log(count()); // 0

// Modify with set() or update()
count.set(5);
count.update(value => value + 1);

// Create derived values with computed()
const doubled = computed(() => count() * 2);
```

### Key Characteristics

- **Synchronous reads** - Value is always available immediately
- **Lazy evaluation** - Computed signals only recalculate when read
- **Memoization** - Results are cached until dependencies change
- **Fine-grained tracking** - Angular tracks exactly where signals are used

## The Core API

### signal() - Writable State

```typescript
@Component({ /* ... */ })
export class UserProfile {
  // Simple state
  isAdmin = signal(false);

  // Complex objects
  user = signal<User | null>(null);

  // With custom equality
  data = signal(['test'], { equal: isEqual });

  toggleAdmin() {
    this.isAdmin.update(v => !v);
  }
}
```

### computed() - Derived State

Computed signals automatically track dependencies and update when source signals change:

```typescript
firstName = signal('John');
lastName = signal('Doe');

// Automatically updates when firstName or lastName changes
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

// Complex derivations
canSubmit = computed(() =>
  this.isValid() && !this.isLoading() && this.hasChanges()
);
```

### effect() - Side Effects

Use effects for operations that should happen when signals change:

```typescript
constructor() {
  // Runs whenever user() changes
  effect(() => {
    const user = this.user();
    localStorage.setItem('user', JSON.stringify(user));
  });
}
```

**Important:** Never use `effect()` to set other signals. Use `computed()` for derived state.

## New APIs in Angular 21-22

### linkedSignal() - Dependent Writable State

When you need a writable signal that derives its initial value from another signal:

```typescript
// Selected option resets when options change
options = signal(['A', 'B', 'C']);
selectedOption = linkedSignal(() => this.options()[0]);

// User can manually change selection
selectOption(opt: string) {
  this.selectedOption.set(opt);
}

// But when options change, selectedOption resets to first item
```

### resource() - Async Data Management

The `resource()` API manages asynchronous data fetching with signals:

```typescript
userId = input.required<string>();

user = resource({
  request: () => this.userId(),
  loader: async ({ request: id }) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
});

// Access data via signals
@if (user.isLoading()) {
  <loading-spinner />
} @else if (user.hasValue()) {
  <user-card [user]="user.value()" />
}
```

### httpResource() - HTTP with Signals

A reactive wrapper around `HttpClient`:

```typescript
userId = input.required<string>();

// Automatically refetches when userId changes
user = httpResource<User>(() => `/api/users/${this.userId()}`);

// With advanced options
users = httpResource(() => ({
  url: '/api/users',
  params: { page: this.page(), limit: '10' }
}));
```

**Built-in signals:**
- `isLoading()` - Request in progress
- `hasValue()` - Data successfully loaded
- `value()` - The response data
- `error()` - Error information

**Template usage:**

```html
@if (user.hasValue()) {
  <user-details [user]="user.value()" />
} @else if (user.error()) {
  <error-message>Could not load user</error-message>
} @else if (user.isLoading()) {
  <loading-spinner />
}
```

### Signal Forms (Angular 21+)

Fully type-safe forms with signals:

```typescript
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input [formField]="formData.fields.email" />
    @if (formData.fields.email.errors()) {
      <span class="error">Invalid email</span>
    }
  `
})
export class LoginForm {
  formData = form({
    email: ['', [required, email]],
    password: ['', [required, minLength(8)]]
  });
}
```

## RxJS: When You Still Need It

RxJS remains essential for:

### 1. Event Streams and Timing Operations

```typescript
// Debounced search with cancellation
searchTerm = signal('');

searchResults = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(term => term.length > 2),
    switchMap(term => this.searchService.search(term))
  ),
  { initialValue: [] }
);
```

### 2. Complex Async Orchestration

```typescript
// Parallel requests with error handling
data$ = forkJoin({
  user: this.userService.getUser(id),
  posts: this.postService.getPosts(id),
  comments: this.commentService.getComments(id)
}).pipe(
  catchError(error => of({ error })),
  retry(3)
);
```

### 3. WebSockets and Real-time Data

```typescript
messages$ = this.websocket.connect().pipe(
  retry({ delay: 1000 }),
  share()
);
```

### 4. Cancellation Patterns

```typescript
// Cancel previous request on new emission
typeahead$ = this.input$.pipe(
  switchMap(term => this.api.search(term))
);
```

## The Decision Matrix

| Scenario | Use Signals | Use RxJS |
|----------|-------------|----------|
| Component state | ✅ | ❌ |
| Form values | ✅ | ❌ |
| UI state (loading, error) | ✅ | ❌ |
| Derived/computed values | ✅ | ❌ |
| HTTP responses (simple) | ✅ httpResource | ❌ |
| Debounce/throttle | ❌ | ✅ |
| Complex event streams | ❌ | ✅ |
| WebSocket connections | ❌ | ✅ |
| Request cancellation | ❌ | ✅ switchMap |
| Retry logic | ❌ | ✅ |
| Multi-source coordination | ❌ | ✅ forkJoin/combineLatest |

## The Hybrid Pattern

The best approach combines both tools:

```typescript
@Component({
  template: `
    <input (input)="searchTerm.set($any($event.target).value)" />

    @if (isLoading()) {
      <div>Searching...</div>
    }

    @for (user of users(); track user.id) {
      <user-card [user]="user" />
    }
  `
})
export class UserSearch {
  private http = inject(HttpClient);

  // Signal for immediate UI binding
  searchTerm = signal('');
  isLoading = signal(false);

  // Convert to Observable for RxJS operators
  // Then convert back to Signal for template
  users = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length > 2),
      tap(() => this.isLoading.set(true)),
      switchMap(term => this.http.get<User[]>(`/api/users?q=${term}`)),
      tap(() => this.isLoading.set(false)),
      catchError(() => {
        this.isLoading.set(false);
        return of([]);
      })
    ),
    { initialValue: [] }
  );
}
```

## Signal-in-a-Service Pattern

For shared state management:

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  // Private writable state
  private readonly _items = signal<CartItem[]>([]);

  // Public read-only access
  readonly items = this._items.asReadonly();

  // Derived state
  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  // State mutations through methods
  addItem(item: CartItem) {
    this._items.update(items => [...items, item]);
  }

  removeItem(id: string) {
    this._items.update(items => items.filter(i => i.id !== id));
  }
}
```

## Migration Strategy

Angular provides CLI migrations:

```bash
# Migrate @Input() to input()
ng generate @angular/core:signal-input-migration

# Migrate @Output() to output()
ng generate @angular/core:signal-output-migration

# Migrate @ViewChild/@ContentChild to signal queries
ng generate @angular/core:signal-queries-migration
```

**Recommended approach:**
1. Start new features with signals
2. Use `httpResource` for simple data fetching
3. Keep RxJS for complex event handling
4. Migrate incrementally during maintenance

## Anti-Patterns to Avoid

### Don't use effect() to set signals

```typescript
// ❌ Bad - creates unnecessary complexity
effect(() => {
  this.derived.set(this.source() * 2);
});

// ✅ Good - use computed instead
derived = computed(() => this.source() * 2);
```

### Don't nest signals

```typescript
// ❌ Bad - hard to track
const nested = signal(signal(0));

// ✅ Good - flat structure
const value = signal(0);
```

### Don't ignore async boundaries

```typescript
// ❌ Bad - signal read after await won't be tracked
effect(async () => {
  await someAsync();
  console.log(this.data()); // Not tracked!
});

// ✅ Good - read before async boundary
effect(async () => {
  const data = this.data(); // Tracked
  await someAsync();
  console.log(data);
});
```

## Conclusion

**Signals for state. RxJS for streams.**

In 2026, the best Angular applications use signals as the default for all state management, reaching for RxJS only when the problem genuinely requires async orchestration, timing operations, or event stream processing.

The `toSignal()` and `toObservable()` interop functions make it easy to combine both approaches, letting you leverage the simplicity of signals with the power of RxJS when needed.

## References

- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Reactivity with Signals](https://angular.dev/essentials/signals)
- [httpResource Guide](https://angular.dev/guide/http/http-resource)
- [Signal Forms Overview](https://angular.dev/guide/forms/signals/overview)
- [Will Signals Replace RxJS?](https://angularexperts.io/blog/signals-vs-rxjs/)
- [Navigating Angular Signals from v17.3 to v21](https://dev.to/leolanese/the-operators-manual-navigating-angular-signals-from-v173-to-v21-25hj)
