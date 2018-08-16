# Utilities

## `static sanitize`

Escape characters expected special by regex engines (all of `.`, `|`, `*`, `?`, `+`, `(`, `)`, `{`, `}`, `^`, `$`, `\`, `:`, `=`, `[` and `]`).

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | String to sanitize

This method will not be accessible from outside the source file since `VerEx()` returns an instance of the class rather than the class itself.

```js
const stringToEscape = '(http://example.com?arg=foo+bar)';

// => '\(http:\/\/example.com\?arg\=foo\+bar\)'
console.log(VerbalExpressions.sanitize(stringToEscape));
```

## `add`

Append a literal expression to the object.

Parameter                   | Expected type | Description
----------------------------|---------------|--------------------------------
`value` (defaults to `''`)  | `String`      | Expression to add to the object

```js
const expr = VerEx();
expr.add('(foo)?(?:bar)*');

console.log(expr); // => /(foo)?(?:bar)*/gm
```
