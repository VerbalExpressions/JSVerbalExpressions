# Rules

## `startOfLine`

Control whether to match the expression only if it appears from the beginning of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

## `endOfLine`

Control whether to match the expression only if it appears till the end of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

## `then`

Match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match

## `find`

Alias for [`then`](#then). Meant to be used when the first thing you want to match is a string.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match

## `maybe`

Optionally match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to optionally match

## `or`

Alternatively, match another expression.

Parameter | Expected type | Description
----------|---------------|------------
`value` (optional)  | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match instead

If no parameters are passed into `or`, the alternate expression would be the one built after the call to `or`.

## `anything`

Match any character(s) any (including zero) number of times.

## `anythingBut`

Match any character(s) except these any (including zero) number of times.

Parameter | Expected type      | Description
----------|--------------------|----------------------------------
`value`   | `String`           | String of characters to not match

## `something`

Match any character(s) at least once.

## `somethingBut`

Match any character(s) except these at least once.

Parameter | Expected type | Description
----------|---------------|----------------------------------
`value`   | `String`      | String of characters to not match

## `anyOf`

Match any of these characters exactly once.

Parameter | Expected type | Description
----------|---------------|------------------------------
`value`   | `String`      | String of characters to match

## `any`

Alias for [`anyOf`](#anyof).

## `range`

Match any character within the range defined by the parameters.

Parameter  | Expected type | Description
-----------|---------------|--------------------
`...range` | `String[]`    | Range of characters

Arguments will be interpreted as pairs.

For example, `.range('a', 'z', '0', '9')` will be interpreted to mean any character within the ranges `a–z` (ascii x–y) or `0–9` (ascii x–y). The method expects an even number of parameters; unpaired parameters are ignored.
