# Unicode Emoji Annotations

> Unicode standard compliant emoji annotations (internationalized text-to-speech descriptions and keywords) with extensions provided by the community

- lightweight, precompiled, easy to parse JSON data with a minimalistic API
- straight from the source, compiled directly from [unicode repository data files](http://unicode.org/repos/cldr/tags/release-30)
- up-to-date, supporting unicode CLDR version v30 (stable)
- best used in combination with the [unicode-emoji-data](https://www.npmjs.com/package/unicode-emoji-data) module

## API

Requiring/importing `unicode-emoji-annotations` gives you the following API to work with:

- `cldrAnnotations`
- `communityAnnotations`
- `combinedAnnotationsForLanguage`

### `cldrAnnotations`

```javascript
{
  de: [..., { /* emoji annotation */ }, ...],
  en: [..., { /* emoji annotation */ }, ...]
}
```

Properties of an emoji annotation explained:

- `sequence`

  normalized code point sequence;

- `tts`

  text-to-speech description;

- `keywords`

  array of keywords;

### `communityAnnotations`

```javascript
{
  global: [..., { /* emoji annotation */ }, ...],
  de: [..., { /* emoji annotation */ }, ...],
  en: [..., { /* emoji annotation */ }, ...]
}
```

### `combinedAnnotationsForLanguage`

```javascript
function (language) {}
```

Combines `language` (e.g. `'de'`, `'en'`) specific cldr and community annotations with global community annotations; returns an array of objects representing combined annotations:

```javascript
[..., { /* emoji annotation */ }, ...]
```

## Usage

### CommonJS

```javascript
const unicodeEmojiAnnotations = require('unicode-emoji-annotations');
const englishCldrAnnotations = unicodeEmojiAnnotations.cldrAnnotations.en;
const englishCommunityAnnotations = unicodeEmojiAnnotations.communityAnnotations.en;
const globalCommunityAnnotations = unicodeEmojiAnnotations.communityAnnotations.global;
const englishAnnotations = unicodeEmojiAnnotations.combinedAnnotationsForLanguage('en');
```

### ES6/babel

```javascript
import { cldrAnnotations, communityAnnotations, combinedAnnotationsForLanguage } from 'unicode-emoji-annotations';
const englishCldrAnnotations = cldrAnnotations.en;
const englishCommunityAnnotations = communityAnnotations.en;
const globalCommunityAnnotations = communityAnnotations.global;
const englishAnnotations = combinedAnnotationsForLanguage('en');
```

## Install

`npm install unicode-emoji-annotations`

## License

[MIT](https://github.com/dematerializer/unicode-emoji-annotations/blob/master/LICENSE)

## Development

### Status

[![Travis](https://img.shields.io/travis/dematerializer/unicode-emoji-annotations.svg?style=flat-square)](https://travis-ci.org/dematerializer/unicode-emoji-annotations)
[![Codecov](https://img.shields.io/codecov/c/github/dematerializer/unicode-emoji-annotations.svg?style=flat-square)](https://codecov.io/gh/dematerializer/unicode-emoji-annotations)

### Contributing

TODO
