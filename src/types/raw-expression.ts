import sanitize from "../util/sanitize";
import Expression from "./expression";

type Primitives = string | number;

class RawExpression {
  public static fromExpression(expression: Expression): RawExpression {
    if (expression instanceof RawExpression) {
      return expression;
    } else if (expression instanceof RegExp) {
      return new RawExpression(expression);
    } else {
      return new RawExpression(sanitize(expression));
    }
  }

  public static arrayFromExpressions(expressions: Expression[]): RawExpression[] {
    const converted: RawExpression[] = [];

    for (const arg of expressions) {
      converted.push(RawExpression.fromExpression(arg));
    }

    return converted;
  }

  public value: Primitives;

  constructor(value: Primitives | RegExp | RawExpression) {
    if (value instanceof RawExpression) {
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

export default RawExpression;
