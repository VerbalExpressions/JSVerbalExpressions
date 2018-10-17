# Rules

## `startOfLine`

Control whether to match the expression only if it appears from the beginning of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

```js
const expr1 = VerEx().find('apple');
console.log(expr1.test('pineapple')); // => true

const expr2 = VerEx().startOfLine().find('apple');
console.log(expr2.test('pineapple')); // => false
```

## `endOfLine`

Control whether to match the expression only if it appears till the end of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

```js
const expr1 = VerEx().find('apple');
console.log(expr1.test('apples')); // => true

const expr2 = VerEx().find('apple').endOfLine();
console.log(expr2.test('apples')); // => false
```

## `then`

Match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match

```js
const expr = VerEx().then('foo');
console.log(expr.test('foo')); // => true
```

## `find`

Alias for [`then`](#then). Meant for semantics when used at the beginning of a verbal expression. For example, `VerEx().find('foo')` is more readable than `VerEx().then('foo')`.

## `maybe`

Optionally match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to optionally match

```js
const protocol = VerEx().find('http').maybe('s').then('://');

console.log(protocol.test('http://')); // => true
protocol.lastIndex = 0;
console.log(protocol.test('https://')); // => true
```

## `or`

Alternatively, match another expression.

Parameter | Expected type | Description
----------|---------------|------------
`value` (optional)  | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match instead

If no parameters are passed into `or`, the alternate expression would be the one built after the call to `or`.

```js
let fooOrBar = VerEx().find('foo').or('bar');
console.log(expr.test('foo')); // => true
fooOrBar.lastIndex = 0
console.log(expr.test('bar')); // => true

// alternate syntax
fooOrBar = VerEx().find('foo').or().find('bar');
console.log(expr.test('foo')); // => true
fooOrBar.lastIndex = 0
console.log(expr.test('bar')); // => true
```

## `anything`

Match any character(s) any (including zero) number of times.

```js
const anything = VerEx().anything();

console.log(anything.test('')); // => true
anything.lastIndex = 0;
console.log(anything.test('x')); // => true
```

## `anythingBut`

Match any character(s) except these any (including zero) number of times.

Parameter | Expected type      | Description
----------|--------------------|----------------------------------
`value`   | `String`           | String of characters to not match

```js
const anythingButXyz = VerEx().anythingBut('xyz');

console.log(anythingButXyz.test('')); // => true
anythingButXyz.lastIndex = 0;
console.log(anythingButXyz.test('a')); // => true
anythingButXyz.lastIndex = 0;
console.log(anythingButXyz.test('x')); // => false
```

## `something`

Match any character(s) at least once.

```js
const something = VerEx().something();

console.log(something.test('abc')); // => true
something.lastIndex = 0;
console.log(something.test('')); // => false
```

## `somethingBut`

Match any character(s) except these at least once.

Parameter | Expected type | Description
----------|---------------|----------------------------------
`value`   | `String`      | String of characters to not match

```js
const somethingButXyz = VerEx().somethingBut('xyz');

console.log(somethingButXyz.test('abc')); // => true
somethingButXyz.lastIndex = 0;
console.log(somethingButXyz.test('')); // => false
somethingButXyz.lastIndex = 0;
console.log(somethingButXyz.test('xyz')); // => false
```

## `anyOf`

Match any of these characters exactly once.

Parameter | Expected type | Description
----------|---------------|------------------------------
`value`   | `String`      | String of characters to match

```js
const expr = VerEx().anyOf('abc');
console.log(expr.test('c')); // => true
expr.lastIndex = 0;
console.log(expr.test('d')); // => false
```

## `any`

Alias for [`anyOf`](#anyof).

## `not`

Ensure that the parameter does not follow.

Parameter | Expected type   | Description
----------|-----------------|---------------------------
`value`   | `String|Number` | Value to ensure absence of

```js
const notLeapDay = VerEx().startOfLine().not('FEB-29').something().endOfLine();

console.log(notLeapDay.test('FEB-29-2017')); // => false
notLeapDay.lastIndex = 0;
console.log(notLeapDay.test('FEB-28-2017')); // => true
```

## `range`

Match any character within the range defined by the parameters.

Parameter  | Expected type | Description
-----------|---------------|--------------------
`...range` | `String[]`    | Range of characters

Arguments will be interpreted as pairs.

For example, `.range('a', 'z', '0', '9')` will be interpreted to mean any character within the ranges `a–z` (ascii x–y) or `0–9` (ascii x–y). The method expects an even number of parameters; unpaired parameters are ignored.

```js
const hex = VerEx().range('0', '9', 'a', 'f').oneOrMore();

console.log(hex.test('b39a3f')); // => true
hex.lastIndex = 0;
console.log(hex.test('b39aeg')); // => false
```
