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
- externalize/outsource annotation stuff because of accumulated file size
- make sure english annotations are complete via community annotations
- test annotations and combine-annotations


1. testing (proves the "fully tested" statement)
2. write documentation (https://github.com/noffle/art-of-readme)
3. bonus: categorize & sort based on CLDR and merged-in community-defined internationalized categorizations

# Notes

Sort Order & Categorization
- incomplete: http://www.unicode.org/repos/cldr/tags/release-30-d02/common/collation/root.xml
- deprecated: http://www.unicode.org/Public/6.3.0/ucd/NamesList.txt
- OSX proprietary: plutil -convert json -r "/System/Library/Input Methods/CharacterPalette.app/Contents/Resources/Category-Emoji.plist" -o ./Category-Emoji.json
- Android proprietary:
https://android.googlesource.com/platform/packages/inputmethods/LatinIME/+/master/java/src/com/android/inputmethod/keyboard/emoji/EmojiCategory.java
https://android.googlesource.com/platform/packages/inputmethods/LatinIME/+/master/java/res/values/emoji-categories.xml
https://android.googlesource.com/platform/packages/inputmethods/LatinIME/+/master/java/res/values-de/strings-talkback-descriptions.xml
