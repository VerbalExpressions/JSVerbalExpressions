/**
 * User-supplied strings/numbers. As the name suggests, these are meant to be
 * sanitized before they are used as part of a regex.
 *
 * See also: src/util/sanitize.ts
 */
type SanitizeWorthy = string | number;

export default SanitizeWorthy;
