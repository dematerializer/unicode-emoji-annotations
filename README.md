# Unicode Emoji Annotations

Your single source of truth for unicode compliant internationalized emoji annotations (text-to-speech descriptions and keywords) with extensions provided by the community.
- straight from the source (fetches and processes [unicode repository data files](http://unicode.org/repos/cldr/)
- up-to-date, choose between different CLDR versions (29 and 30)
- 100% tested, see [test coverage](TODO)
- lightweight, precompiled, easy to parse JSON format
- minimalistic API
- no heavy weight [image files or spritesheets](https://github.com/iamcal/emoji-data) included

## Install

`npm install unicode-emoji-annotations`

## Usage

### CommonJS

`const emojiAnnotations = require('unicode-emoji-annotations');`

### ES6/babel

`import emojiAnnotations from 'unicode-emoji-annotations';`

## Structure

TODO

## License

MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

# TODO
- testing (proves the "fully tested" statement)
- write documentation (https://github.com/noffle/art-of-readme)
- pull in unicode-emoji-data dep via npm once it's published
