import VerEx from "../src/verex";
import VerExp from "../src/verex";

describe("VerEx(...expressions)", () => {
  it("should be a function", () => {
    expect(VerEx).toBeInstanceOf(Function);
  });

  it("should return an instance of `RegExp`", () => {
    const expression = VerEx("foo");
    expect(expression).toBeInstanceOf(RegExp);
  });
});

describe("VerExp(...expressions)", () => {
  it("should be an alias for VerEx", () => {
    expect(VerExp).toEqual(VerEx);
  });
});
