---
title: Home
---

## Table Of Contents

- [`VerEx`](#verex)
- [`VerbalExpression`](#verbalexpression)
    - [Constructor](#constructor)
        - [`constructor`](#constructor)
    - [Utilities](#utilities)
        - [`static sanitize`](#static-sanitize)
        - [`add`](#add)
    - [Rules](#rules)
        - [`startOfLine`](#startofline)
        - [`endOfLine`](#endofline)
        - [`then`](#then)
        - [`find`](#find)
        - [`maybe`](#maybe)
        - [`or`](#or)
        - [`anything`](#anything)
        - [`anythingBut`](#anythingbut)
        - [`something`](#something)
        - [`somethingBut`](#somethingbut)
        - [`anyOf`](#anyof)
        - [`any`](#any)
        - [`range`](#range)
    - [Special Characters](#special-characters)
        - [`lineBreak`](#linebreak)
        - [`br`](#br)
        - [`tab`](#tab)
        - [`word`](#word)
        - [`digit`](#digit)
        - [`whitespace`](#whitespace)
    - [Modifiers](#modifiers)
        - [`addModifier`](#addmodifier)
        - [`removeModifier`](#removemodifier)
        - [`withAnyCase`](#withanycase)
        - [`stopAtFirst`](#stopatfirst)
        - [`searchOneLine`](#searchoneline)
        - [`repeatPrevious`](#repeatprevious)
    - [Loops](#loops)
        - [`oneOrMore`](#oneormore)
        - [`multiple`](#multiple)
    - [Capture Groups](#capture-groups)
        - [`beginCapture`](#begincapture)
        - [`endCapture`](#endcapture)
    - [Miscellaneous](#miscellaneous)
        - [`replace`](#replace)
        - [`toRegExp`](#toregexp)

_________________

Methods have a return type of [`VerbalExpression`](#verbalexpression) except where mentioned otherwise. If there is no mention of a method's parameters, it is to be assumed that it has none.

### `VerEx`

Return a new instance of [`VerbalExpression`](#verbalexpression).

This is the function that is exported from within `VerbalExpressions.js` and is to be the first method in chains that describe verbal expressions.

# `VerbalExpression`

A class that extends [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

## Constructor

### `constructor`

Construct and return a new instance of [`VerbalExpression`](#verbalexpression).

## Utilities

### `static sanitize`

Escape characters expected special by regex engines (all of `.`, `|`, `*`, `?`, `+`, `(`, `)`, `{`, `}`, `^`, `$`, `\`, `:`, `=`, `[` and `]`).

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | String to sanitize

### `add`

Append a literal expression to the object.

Parameter                   | Expected type | Description
----------------------------|---------------|--------------------------------
`value` (defaults to `''`)  | `String`      | Expression to add to the object

## Rules

### `startOfLine`

Control whether to match the expression only if it appears from the beginning of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

### `endOfLine`

Control whether to match the expression only if it appears till the end of the line.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`)  | `boolean` | Whether to enable this behavior

### `then`

Match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match

### `find`

Alias for [`then`](#then). Meant to be used when the first thing you want to match is a string.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match

### `maybe`

Optionally match an expression.

Parameter | Expected type | Description
----------|---------------|------------
`value`   | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to optionally match

### `or`

Alternatively, match another expression.

Parameter | Expected type | Description
----------|---------------|------------
`value` (optional)  | `String`, `number`, `RegExp`, `VerbalExpression` | Expression to match instead

If no parameters are passed into `or`, the alternate expression would be the one built after the call to `or`.

### `anything`

Match any character(s) any (including zero) number of times.

### `anythingBut`

Match any character(s) except these any (including zero) number of times.

Parameter | Expected type      | Description
----------|--------------------|----------------------------------
`value`   | `String`           | String of characters to not match

### `something`

Match any character(s) at least once.

### `somethingBut`

Match any character(s) except these at least once.

Parameter | Expected type | Description
----------|---------------|----------------------------------
`value`   | `String`      | String of characters to not match

### `anyOf`

Match any of these characters.

Parameter | Expected type | Description
----------|---------------|------------------------------
`value`   | `String`      | String of characters to match

### `any`
### `range`

## Special Characters

### `lineBreak`

Match a line break (both [Unix style](//codepoints.net/U+000A) and [Windows style](//codepoints.net/U+000D)).

### `br`

An alias for [`lineBreak`](#linebreak).

### `tab`

Match a [tab character](//codepoints.net/U+0009).

### `word`

Match a word, a string of word characters (a–z, A–Z, 0–9 or \_).

### `digit`

Match a digit (0–9).

### `whitespace`

Match a whitespace character (one of [space](//codepoints.net/U+0020), [tab](//codepoints.net/U+0009), [carriage return](//codepoints.net/U+000D), [new line](//codepoints.net/U+000), [vertical tab](//codepoints.net/U+000B) and [form feed](//codepoints.net/U+000C)).

## Modifiers

### `addModifier`

Manually add a regex modifier.

Parameter | Expected type | Description
----------|---------------|----------------
`value`   | `String`      | Modifier to add

### `removeModifier`

Manually remove a regex modifier.

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | Modifier to remove

### `withAnyCase`

Control case-insensitive matching. Equivalent to adding or removing the `i` modifier.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

### `stopAtFirst`

Control global matching. Enabling would cause the expression to not look for matches beyond the first match. Equivalent to removing or adding the `g` modifier. Global matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

### `searchOneLine`

Control multi-line matching. Enabling would cause the expression to not look for matches beyond the first line. Equivalent to removing or adding the `m` modifier. Multi-line matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

### `repeatPrevious`

Repeat the previous item exactly `count` times or between `mix` and `max` (inclusive) times.

Usage 1:

Parameter | Expected type | Description
----------|---------------|------------
`count`   | `Number`      | Number of times to repeat the previous item

Usage 2:

Parameter | Expected type | Description
----------|---------------|------------
`min`     | `Number`      | Minimum number of times to repeat the previous item
`max`     | `Number`      | Maximum number of times to repeat the previous item

## Loops

### `oneOrMore`

Match the previous stuff one or more times.

### `multiple`

Match something zero or more times.

Usage 1:

Parameter | Expected type | Description
----------|---------------|--------------
`value`   | `String`      | Item to match

Usage 2:

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present

Usage 3:

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present
`max`     | `Number`      | Maximum number of times it should be present

## Capture Groups

### `beginCapture`

Begin a capture group. Capture groups can be used to extract data from within the regular expression match for further processing.

### `endCapture`

End a capture group. See also [`beginCapture`](#begincapture).

## Miscellaneous

### `replace`

Replace characters matching the VerbalExpression in a string with another string.

Parameter | Expected type | Description
----------|---------------|-------------------------------
`source`  | `String`      | String to look for matches in
`value`   | `String`      | String to replace matches with

Return type: [`String`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### `toRegExp`

Convert the class to a [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object.

Return type: [`RegExp`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
