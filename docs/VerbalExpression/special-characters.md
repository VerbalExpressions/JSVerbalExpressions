# Special Characters

## `lineBreak`

Match a line break (both [Unix style](//codepoints.net/U+000A) and [Windows style](//codepoints.net/U+000D)).

```js
const expr = VerEx().find('foo').lineBreak().then('bar');
console.log(expr.test('foo\nbar'));
```

## `br`

An alias for [`lineBreak`](#linebreak).

## `tab`

Match a [tab character](//codepoints.net/U+0009).

```js
const tabs = VerEx().tab();
const code = '\tconsole.log("tabs vs spaces")';

// => '    console.log("tabs vs spaces")'
console.log(tabs.replace(code, '    '));
```

## `word`

Match a word—a string of word characters (a–z, A–Z, 0–9 or \_).

```js
const word = VerEx().word();
const words = 'foo bar foo_bar foo-bar foo123';
```

## `digit`

Match a digit (0–9).

```js
const digit = VerEx().digit();
console.log(digit.test('2')); // => true
```

## `whitespace`

Match a whitespace character (one of [space](//codepoints.net/U+0020), [tab](//codepoints.net/U+0009), [carriage return](//codepoints.net/U+000D), [new line](//codepoints.net/U+000), [vertical tab](//codepoints.net/U+000B) and [form feed](//codepoints.net/U+000C)).

```js
const expr = VerEx().word().whitespace().word();
console.log(expr.test('word\tword')); // => true
```
