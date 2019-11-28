import sanitize from "../util/sanitize";
import Expression from "./expression";

type Primitives = string | number;

/**
 * A fragment of a regular expression.
 *
 * A string wrapped within a class so that it can be distinguished from regular
 * strings through instanceof. These "strings" are meant to be interpreted
 * literally and should not be sanitized, unlike user-supplied strings/numbers.
 *
 * This is the return type of many VerBalExpressions methods.
 */
class Fragment {
  public value: Primitives;

  constructor(value: Primitives | RegExp | Fragment) {
    if (value instanceof Fragment) {
      this.value = value.value;
      return;
    }

    if (value instanceof RegExp) {
      this.value = value.source;
      return;
    }

    this.value = value;
  }

  public static fromExpression(expression: Expression): Fragment {
    if (expression instanceof Fragment) {
      return expression;
    }

    if (expression instanceof RegExp) {
      return new Fragment(expression);
    }

    return new Fragment(sanitize(expression));
  }

  public static arrayFromExpressions(expressions: Expression[]): Fragment[] {
    const converted: Fragment[] = [];

    for (const arg of expressions) {
      converted.push(Fragment.fromExpression(arg));
    }

    return converted;
  }

  public toString(): string {
    if (typeof this.value === "number") {
      return this.value.toString();
    }

    return this.value;
  }
}

export default Fragment;
