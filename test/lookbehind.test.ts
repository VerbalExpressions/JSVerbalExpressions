import lookbehind from "../src/lookbehind";
import VerEx from "../src/verex";

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

    expect(exp.test("barfoo")).toBeTruthy();
    [match] = exp.exec("barfoo");
    expect(match).toEqual("foo");
    expect(match).not.toEqual("barfoo");

    expect(exp.test("bazfoo")).toBeFalsy();
    expect(exp.test("banfoo")).toBeFalsy();
  });

  it("should be able to accept multiple arguments", () => {
    const exp = VerEx(
      lookbehind("bar", "baz"),
      "foo"
    );

    expect(exp.test("barbazfoo")).toBeTruthy();

    expect(exp.test("foo")).toBeFalsy();
    expect(exp.test("barfoo")).toBeFalsy();
    expect(exp.test("bazfoo")).toBeFalsy();
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

      expect(exp.test("bazfoo")).toBeTruthy();
      [match] = exp.exec("bazfoo");
      expect(match).toEqual("foo");

      expect(exp.test("banfoo")).toBeTruthy();
      [match] = exp.exec("banfoo");
      expect(match).toEqual("foo");

      expect(exp.test("barfoo")).toBeFalsy();
    });

    it("should be able to accept multiple arguments", () => {
      const exp = VerEx(
        lookbehind.negative("bar", "baz"),
        "foo"
      );

      expect(exp.test("bazfoo")).toBeTruthy();
      expect(exp.test("barfoo")).toBeTruthy();
      expect(exp.test("banfoo")).toBeTruthy();

      expect(exp.test("barbazfoo")).toBeFalsy();
    });
  });
});
