# Countries

Country names are available in 20 languages: `en` (default), `zh`, `hi`, `es`, `fr`, `ar`, `bn`, `pt`, `ru`, `ur`, `id`, `de`, `ja`, `mr`, `te`, `tr`, `ko`, `vi`, `it`, `fa`.

ESM package:

```js
import { getCountries, getCountryByName, getCountryByAlpha2, getCountryByAlpha3, getCountryByNumeric, getLanguages, getPopularLanguages } from '@tertium/countries';
```

## Get all countries

```js
const countries = getCountries();
```

Result:

```js
[
  {
    name: 'Afghanistan',
    numeric: '004',
    alpha2: 'AF',
    alpha3: 'AFG',
    dial: ['+93'],
    image: './images/AF.svg',
  }
]
```

## Get country by name

```js
const country = getCountryByName('Afghanistan');
```

Result:

```js
{
  name: 'Afghanistan',
  numeric: '004',
  alpha2: 'AF',
  alpha3: 'AFG',
  dial: ['+93'],
  image: './images/AF.svg',
}
```

Throws `Unknown country: <name>` if the name is not found.

## Get country by localized name

Pass a locale code as the second argument. Supported locales: `en` (default), `zh`, `hi`, `es`, `fr`, `ar`, `bn`, `pt`, `ru`, `ur`, `id`, `de`, `ja`, `mr`, `te`, `tr`, `ko`, `vi`, `it`, `fa`.

```js
const country = getCountryByName('Россия', 'ru');
```

Result:

```js
{
  name: 'Россия',
  numeric: '643',
  alpha2: 'RU',
  alpha3: 'RUS',
  dial: ['+7'],
  image: './images/RU.svg',
}
```

## Get country by code

```js
const byAlpha2 = getCountryByAlpha2('AF');
const byAlpha3 = getCountryByAlpha3('AFG');
const byNumeric = getCountryByNumeric('004');
```

All three return the same `Country` object. Throws `Unknown country: <code>` if the code is not found.

## Get all languages

```js
const languages = getLanguages();
```

Result:

```js
[
  { name: 'Abkhazian', code: 'ab' },
  { name: 'Afar', code: 'aa' },
  // ...
]
```

## Get popular languages

The 20 most spoken languages in the world by total number of speakers.

```js
const languages = getPopularLanguages();
```

Result:

```js
[
  { name: 'English', code: 'en' },
  { name: 'Chinese', code: 'zh' },
  { name: 'Hindi', code: 'hi' },
  // ...
]
```
