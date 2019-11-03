import sanitize from "../util/sanitize";
import Expression from "./expression";

type Primitives = string | number;

class Fragment {
  public static fromExpression(expression: Expression): Fragment {
    if (expression instanceof Fragment) {
      return expression;
    } else if (expression instanceof RegExp) {
      return new Fragment(expression);
    } else {
      return new Fragment(sanitize(expression));
    }
  }

  public static arrayFromExpressions(expressions: Expression[]): Fragment[] {
    const converted: Fragment[] = [];

    for (const arg of expressions) {
      converted.push(Fragment.fromExpression(arg));
    }

    return converted;
  }

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

  public toString() {
    if (typeof this.value === "number") {
      return this.value.toString();
    }

    return this.value;
  }
}

export default Fragment;
