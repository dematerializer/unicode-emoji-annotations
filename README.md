# Unicode Emoji Annotations

> Your single source of truth for unicode standard compliant, internationalized emoji annotations (text-to-speech descriptions and keywords) with extensions provided by the community.

- lightweight, precompiled, easy to parse JSON format with a minimalistic API
- straight from the source, compiled from [unicode repository data files](http://unicode.org/repos/cldr/)
- up-to-date, supporting CLDR versions 29 and 30
- no heavy weight [image files or spritesheets](https://github.com/iamcal/emoji-data) included
- best used with the [unicode-emoji-data](TODO) module

## Install

`npm install unicode-emoji-annotations`

## Usage

### CommonJS

`const emojiAnnotations = require('unicode-emoji-annotations');`

### ES6/babel

`import emojiAnnotations from 'unicode-emoji-annotations';`

## License

MIT

## TODO

- testing (proves the "fully tested" statement)
- write documentation (https://github.com/noffle/art-of-readme)
- pull in unicode-emoji-data dep via npm once it's published
