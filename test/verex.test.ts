import VerEx from "../src/verex";
import VerExp from "../src/verex";
import "./custom-matchers";

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

    expect(expression).toMatchString("foobarbaz");
  });

  it("should accept regular expressions", () => {
    const expression = VerEx(/^/, /foo/, /(?:bar)?/, /$/);

    expect(expression).toMatchString("foo");
    expect(expression).toMatchString("foobar");
  });

  it("should accept numbers", () => {
    const expression = VerEx(3.14159);

    expect(expression).toMatchString("3.14159");
    expect(expression).toMatchString("33.14159%");

    expect(expression).not.toMatchString("3014159");
  });
});

describe("VerExp(...expressions)", () => {
  it("should be an alias for VerEx", () => {
    expect(VerExp).toEqual(VerEx);
  });
});
