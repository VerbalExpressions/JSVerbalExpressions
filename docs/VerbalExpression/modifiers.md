# Modifiers

## `addModifier`

Manually add a regex modifier (flag).

Parameter | Expected type | Description
----------|---------------|----------------
`value`   | `String`      | Modifier to add

## `removeModifier`

Manually remove a regex modifier (flag).

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | Modifier to remove

## `withAnyCase`

Control case-insensitive matching. Equivalent to adding or removing the `i` modifier.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

## `stopAtFirst`

Control global matching. Enabling would cause the expression to not look for matches beyond the first match. Equivalent to removing or adding the `g` modifier. Global matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

## `searchOneLine`

Control multi-line matching. Enabling would cause the expression to not look for matches beyond the first line. Equivalent to removing or adding the `m` modifier. Multi-line matching is enabled by default.

Parameter | Expected type | Description
----------|---------------|------------
`enable` (defaults to `true`) | `boolean` | Whether to enable this behavior

## `repeatPrevious`

Usage 1:

Repeat the previous item exactly `count` times.

Parameter | Expected type | Description
----------|---------------|------------
`count`   | `Number`      | Number of times to repeat the previous item

Usage 2:

Repeat the previous item between `mix` and `max` (inclusive) times.

Parameter | Expected type | Description
----------|---------------|------------
`min`     | `Number`      | Minimum number of times to repeat the previous item
`max`     | `Number`      | Maximum number of times to repeat the previous item
