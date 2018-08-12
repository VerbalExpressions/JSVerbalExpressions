# Utilities

## `static sanitize`

Escape characters expected special by regex engines (all of `.`, `|`, `*`, `?`, `+`, `(`, `)`, `{`, `}`, `^`, `$`, `\`, `:`, `=`, `[` and `]`).

Parameter | Expected type | Description
----------|---------------|-------------------
`value`   | `String`      | String to sanitize

## `add`

Append a literal expression to the object.

Parameter                   | Expected type | Description
----------------------------|---------------|--------------------------------
`value` (defaults to `''`)  | `String`      | Expression to add to the object
