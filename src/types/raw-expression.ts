type Primitives = string | number;

class RawExpression {
  value: Primitives;

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

  toString() {
    if (typeof this.value === "number") {
      return this.value.toString();
    }

    return this.value;
  }
}

export default RawExpression;
