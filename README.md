# Unicode Emoji Annotations

> Unicode standard compliant emoji annotations (internationalized text-to-speech descriptions and keywords) with extensions provided by the community

- lightweight, precompiled, easy to use JSON data with a minimalistic API
- straight from the source, compiled directly from [unicode repository data files](http://unicode.org/repos/cldr/tags/release-30)
- up-to-date, supporting the latest stable unicode CLDR version 30
- best used in combination with the [unicode-emoji-data](https://www.npmjs.com/package/unicode-emoji-data) module

This project aims to preserve CLDR emoji annotation data with respect to the original source as closely as possible while offering supplemental community authored annotation data.

*Warning: ~1MB file ahead!* Have a look at [this table to see an example](https://dematerializer.github.io/unicode-emoji-annotations/emoji-annotations.html) of what data this library provides. Especially row [#1152](https://dematerializer.github.io/unicode-emoji-annotations/emoji-annotations.html#1152) is interesting as it shows a CLDR annotation being combined with multiple supplemental community annotations.

Check out [emoji-finder](https://www.npmjs.com/package/emoji-finder) to see an example of how this module can be utilized in a real application.

## Community Annotations

Supplemental annotation data is being authored by a community that will hopefully build around this project in the future. An initial set of community annotations created by the original project maintainer serves as a baseline for further discussions and development.

The need for community authored annotations arises from the fact that the CLDR annotation data provided by unicode is incomplete. Not every emoji is being covered and incompleteness varies across supported languages. Furthermore, some annotations might need to be extended or overridden in order to semantically improve the description of their respective emoji.

Great care is taken so that community authored text-to-speech descriptions and keywords always ever describe solely the semantics of the emoji based on the official unicode emoji names. The annotations must never be based on the actual appearance of emoji, as the official unicode name often leaves room for interpretation and vendors use this to implement the appearance very differently from one another.

## Supported Languages

This table shows languages for which CLDR annotations are included in this library and the respective percentaged coverage of missing CLDR data by community provided supplemental annotations. Feel free to [create an issue](https://github.com/dematerializer/unicode-emoji-annotations/issues) if you like an additional language to be added.

| Language | CLDR | Community Coverage |
| --- | --- | --- |
| de | ✓ | 100% |
| en | ✓ | 100% |

## API

Requiring/importing `unicode-emoji-annotations` gives you the following API to work with:

- `cldrAnnotations`
- `communityAnnotations`
- `combinedAnnotationsForLanguage`

### `cldrAnnotations`

```javascript
{
  ...
  de: [..., { /* emoji annotation */ }, ...],
  en: [..., { /* emoji annotation */ }, ...],
  ...
}
```

Arrays of emoji annotations grouped by language (two-letter code), compiled from unicode CLDR data files.

A typical (english) CLDR annotation looks like this:

```javascript
{
  sequence: '1F61C',
  tts: 'face with stuck-out tongue & winking eye',
  keywords: [
    'eye',
    'face',
    'joke',
    'tongue',
    'wink'
  ]
}
```

Properties of an emoji annotation explained:

- `sequence`

  normalized code point sequence (sequence without any variation selector or modifier applied) e.g. `1F61C`; use it for mapping the annotation to a specific (emoji) unicode character or connecting to further meta data (e.g. [unicode-emoji-data](https://www.npmjs.com/package/unicode-emoji-data) or [emoji-datasource](https://www.npmjs.com/package/emoji-datasource))

- `tts`

  text-to-speech description e.g. `'face with stuck-out tongue & winking eye'` (`en`) or `'Zwinkernder Smiley mit herausgestreckter Zunge'` (`de`)

- `keywords`

  array of keywords e.g. `['eye', 'face', 'joke', 'tongue', 'wink']` (`en`) or `['herausgestreckte Zunge', 'Zwinkern', 'Gesicht']` (`de`)

### `communityAnnotations`

```javascript
{
  global: [..., { /* emoji annotation */ }, ...],
  ...
  de: [..., { /* emoji annotation */ }, ...],
  en: [..., { /* emoji annotation */ }, ...],
  ...
}
```

Arrays of supplemental emoji annotations grouped by language (two-letter code), authored and maintained by the community.

Community annotations might include entirely new entries for supporting emoji that are not currently covered by CLDR, but also additions to `keywords` of existing CLDR annotations. In some rare cases we might even decide to override the `tts` description of existing CLDR annotations where necessary in order to improve semantics.

`global` contains language independent additions to `keywords`, e.g. text emoticons `;-)` (`tts` overrides would make no sense here).

Example of a global supplemental community annotation:

```javascript
{
  sequence: '1F61C',
  keywords: [
    ';-P',
    ';P',
    ';-b',
    ';b'
  ]
}
```

Example of an english supplemental community annotation:

```javascript
{
  sequence: '1F61C',
  keywords: [
    'cheeky'
  ]
}
```

Example of a german supplemental community annotation:

```javascript
{
  sequence: '1F61C',
  keywords: [
    'frech'
  ]
}
```

### `combinedAnnotationsForLanguage`

```javascript
function (language) {}
```

Selectively extends/overrides CLDR annotations with community authored content for the specified `language` (e.g. `'de'`, `'en'`), combining:
- `language` specific CLDR annotations (if available)
- `language` specific community annotations (if available)
- global community annotations (if available)

Overrides `tts`, concatenates `keywords`.

returns an array of combined emoji annotations:

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

Stable unicode 9 cldr 30 data for emoji 4:
<br />
`npm install unicode-emoji-annotations`

Beta unicode 10 cldr 31 data for emoji 5:
<br />
`npm install unicode-emoji-annotations@next`

## License

[MIT](https://github.com/dematerializer/unicode-emoji-annotations/blob/master/LICENSE)

## Development

### Status

[![Travis](https://img.shields.io/travis/dematerializer/unicode-emoji-annotations.svg?style=flat-square)](https://travis-ci.org/dematerializer/unicode-emoji-annotations)
[![Codecov](https://img.shields.io/codecov/c/github/dematerializer/unicode-emoji-annotations.svg?style=flat-square)](https://codecov.io/gh/dematerializer/unicode-emoji-annotations)
