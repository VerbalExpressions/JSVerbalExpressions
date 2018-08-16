# Modifiers

## `addModifier`

Manually add a regex modifier (flag).

Parameter | Expected type | Description
----------|---------------|----------------
`value`   | `String`      | Modifier to add

```js
let expr = VerEx()
console.log(expr.flags); // => 'gm'

expr = expr.addModifier('i');
console.log(expr.flags); // => 'gim'
```

## `removeModifier`

Manually remove a regex modifier (flag).

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | Modifier to remove

```js
let expr = VerEx();
console.log(expr.flags); // => 'gm'

expr = expr.removeModifier('m');
console.log(expr.flags); // => 'g'
```

## `withAnyCase`

Control case-insensitive matching. Equivalent to adding or removing the `i` modifier.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

```js
const hexColorCode = VerEx()
    .find('#')
    .range('0', '9', 'a', 'f')
    .repeatPrevious(6)
    .withAnyCase();

console.log(hexColorCode.test('#93afee')); // => true
hexColorCode.lastIndex = 0;
console.log(hexColorCode.test('#93AFEE')); // => true
```

## `stopAtFirst`

Control global matching. Enabling would cause the expression to not look for matches beyond the first match. Equivalent to removing or adding the `g` modifier. Global matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

```js
```

## `searchOneLine`

Control multi-line matching. Enabling would cause the expression to not look for matches beyond the first line. Equivalent to removing or adding the `m` modifier. Multi-line matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

```js
let findFoo = VerEx().startOfLine().find('foo').endOfLine();
console.log(findFoo.test('foo\nfoo\nfoo')); // => true

findFoo = findFoo.searchOneLine();
console.log(findFoo.test('foo\nfoo\nfoo')); // => false
```

## `repeatPrevious`

### Usage 1

Repeat the previous item exactly `count` times.

Parameter | Expected type | Description
----------|---------------|------------
`count`   | `Number`      | Number of times to repeat the previous item

```js
const expr = VerEx()
    .startOfLine()
    .find('foo')
    .repeatPrevious(2)
    .endOfLine();

console.log(expr.test('foofoo')); // => true
expr.lastIndex = 0;
console.log(expr.test('foofoofoo')); // => false
```

### Usage 2

Repeat the previous item between `mix` and `max` (inclusive) times.

Parameter | Expected type | Description
----------|---------------|------------
`min`     | `Number`      | Minimum number of times to repeat the previous item
`max`     | `Number`      | Maximum number of times to repeat the previous item

```js
const expr = VerEx()
    .startOfLine()
    .find('foo')
    .repeatPrevious(1, 3)
    .endOfLine();

console.log(expr.test('foo')); // => true
expr.lastIndex = 0;
console.log(expr.test('foofoo')); // => true
expr.lastIndex = 0;
console.log(expr.test('foofoofoo')); // => true
expr.lastIndex = 0;
console.log(expr.test('foofoofoofoo')); // => false
```
