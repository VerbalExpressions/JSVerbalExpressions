import lookbehind from "../src/lookbehind";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("lookbehind(expression)", () => {
  it("should be a function", () => {
    expect(lookbehind).toBeInstanceOf(Function);
  });

  it("should ensure the argument exists", () => {
    const exp = VerEx(
      lookbehind("bar"),
      "foo"
    );

    let match: string;

    expect(exp).toMatchString("barfoo");
    [match] = exp.exec("barfoo");
    expect(match).toEqual("foo");
    expect(match).not.toEqual("barfoo");

    expect(exp).not.toMatchString("bazfoo");
    expect(exp).not.toMatchString("banfoo");
  });

  it("should be able to accept multiple arguments", () => {
    const exp = VerEx(
      lookbehind("bar", "baz"),
      "foo"
    );

    expect(exp).toMatchString("barbazfoo");

    expect(exp).not.toMatchString("foo");
    expect(exp).not.toMatchString("barfoo");
    expect(exp).not.toMatchString("bazfoo");
  });

  describe("lookbehind.positive(expression)", () => {
    it("should be an alias for lookbehind", () => {
      expect(lookbehind.positive).toEqual(lookbehind);
    });
  });

  describe("lookbehind.negative(expression)", () => {
    it("should be a function", () => {
      expect(lookbehind.negative).toBeInstanceOf(Function);
    });

    it("should ensure that the argument does not exist", () => {
      const exp = VerEx(
        lookbehind.negative("bar"),
        "foo"
      );

      let match: string;

      expect(exp).toMatchString("bazfoo");
      [match] = exp.exec("bazfoo");
      expect(match).toEqual("foo");

      expect(exp).toMatchString("banfoo");
      [match] = exp.exec("banfoo");
      expect(match).toEqual("foo");

      expect(exp).not.toMatchString("barfoo");
    });

    it("should be able to accept multiple arguments", () => {
      const exp = VerEx(
        lookbehind.negative("bar", "baz"),
        "foo"
      );

      expect(exp).toMatchString("bazfoo");
      expect(exp).toMatchString("barfoo");
      expect(exp).toMatchString("banfoo");

      expect(exp).not.toMatchString("barbazfoo");
    });
  });
});
