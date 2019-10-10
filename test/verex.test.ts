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

  it("should correctly handle zero arguments", () => {
    expect(VerEx()).toEqual(/(?:)/);
  });

  it("should accept multiple strings", () => {
    const expression = VerEx("foo", "bar", "baz");

    expect(expression.test("foobarbaz")).toBeTruthy();
  });

  it("should accept regular expressions", () => {
    const expression = VerEx(/^/, /foo/, /(?:bar)?/, /$/);

    expect(expression.test("foo")).toBeTruthy();
    expect(expression.test("foobar")).toBeTruthy();
  });

  it("should accept numbers", () => {
    const expression = VerEx(3.14159);

    expect(expression.test("3.14159")).toBeTruthy();
    expect(expression.test("33.14159%")).toBeTruthy();

    expect(expression.test("3014159")).toBeFalsy();
  });
});

describe("VerExp(...expressions)", () => {
  it("should be an alias for VerEx", () => {
    expect(VerExp).toEqual(VerEx);
  });
});
