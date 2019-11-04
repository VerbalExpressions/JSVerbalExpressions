# Loops

## `oneOrMore`

Match the previous stuff one or more times.

```js
const integer = VerEx().digit().oneOrMore();
console.log(integer.exec('foo 12345')[0]); // => '12345'
```

## `multiple`

### Usage 1

Match the previous group any number of times.

```js
const expr = VerEx().startOfLine().find(' ').multiple().endOfLine();

console.log(expr.test('   ')); // => true
```

### Usage 2

Match something zero or more times.

Parameter | Expected type | Description
----------|---------------|--------------
`value`   | `String`      | Item to match

```js
const expr = VerEx()
    .find('what').multiple('?')
    .endOfLine();

console.log(expr.test('what')); // => true
expr.lastIndex = 0;
console.log(expr.test('what???'));// => true
```

### Usage 3

Match something greater than or equal to `min` number of times.

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present

```js
const expr = VerEx()
    .find('hurray').multiple('!', 1)
    .endOfLine();

console.log(expr.test('hurray')); // => false
expr.lastIndex = 0;
console.log(expr.test('hurray!!')); // => true
```

### Usage 4

Match something between `min` and `max` (inclusive) number of times.

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present
`max`     | `Number`      | Maximum number of times it should be present

```js
const expr = VerEx()
    .find('h').multiple('i', 1, 3)
    .endOfLine();

console.log(expr.test('hiii')); // => true
expr.lastIndex = 0;
console.log(expr.test('hiiii')); // => false
```
