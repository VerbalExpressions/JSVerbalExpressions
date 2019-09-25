import VerEx from "../src/verbalexpressions";

describe("VerEx(...expressions)", () => {
  it("should be a function", () => {
    expect(VerEx).toBeInstanceOf(Function);
  });

  it("should return an instance of `RegExp`", () => {
    const expression = VerEx("foo");
    expect(expression).toBeInstanceOf(RegExp);
  });
});
