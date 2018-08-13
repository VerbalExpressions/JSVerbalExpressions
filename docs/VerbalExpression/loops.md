## Loops

### `oneOrMore`

Match the previous stuff one or more times.

### `multiple`

Usage 1:

Match something zero or more times.

Parameter | Expected type | Description
----------|---------------|--------------
`value`   | `String`      | Item to match

Usage 2:

Match something greater than or equal to `min` number of times.

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present

Usage 3:

Match something between `min` and `max` (inclusive) number of times.

Parameter | Expected type | Description
----------|---------------|---------------------------------------------
`value`   | `String`      | Item to match
`min`     | `Number`      | Minimum number of times it should be present
`max`     | `Number`      | Maximum number of times it should be present
