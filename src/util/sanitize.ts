import SanitizeWorthy from "../types/sanitize-worthy";

/**
 * A function to escape all characters that hold special meanings in
 * regular expressions (regex meta characters).
 */
function sanitize(input: SanitizeWorthy): string {
  // Regular expression to match meta characters
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
  const toEscape = /([\].|*?+(){}^$\\:=[])/g;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
  const lastMatch = "$&";

  // Escape meta characters
  return input.toString().replace(toEscape, `\\${lastMatch}`);
}

export default sanitize;
