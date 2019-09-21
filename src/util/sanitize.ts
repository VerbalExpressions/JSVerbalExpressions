import Expression from "../types/expression";

export default function sanitize(input: Expression) {
  if (input instanceof RegExp) {
    return input.source;
  }

  // Regular expression to match meta characters
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
  const toEscape = /([\].|*?+(){}^$\\:=[])/g;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
  const lastMatch = "$&";

  // Escape meta characters
  return input.toString().replace(toEscape, `\\${lastMatch}`);
}
