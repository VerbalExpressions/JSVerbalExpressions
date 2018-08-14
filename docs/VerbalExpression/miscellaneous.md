# Miscellaneous

## `replace`

Replace characters matching the VerbalExpression in a string with another string.

Parameter | Expected type | Description
----------|---------------|-------------------------------
`source`  | `String`      | String to look for matches in
`value`   | `String`      | String to replace matches with

Return type: [`String`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

```js
const spaces = VerEx().find(' ');
const fileName = 'a file name.txt';

// => 'a_file_name.txt'
console.log(spaces.replace(fileName, '_'));
```

## `toRegExp`

Convert the class to a [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object.

Return type: [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

```js
const expr = VerEx().find('foo');
console.log(expr.toRegExp()); // => /(?:foo)/gm
```
