import {lookahead, lookbehind} from "../src/lookaround";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("lookahead(...expressions)", () => {
  it("should be a function", () => {
    expect(lookahead).toBeInstanceOf(Function);
  });

  it("should ensure the argument exists", () => {
    const exp = VerEx(
      "foo",
      lookahead("bar")
    );

    expect(exp).toMatchString("foobar");

    const [match] = exp.exec("foobar");
    expect(match).toEqual("foo");
    expect(match).not.toEqual("foobar");

    expect(exp).not.toMatchString("foobaz");
    expect(exp).not.toMatchString("fooban");
  });

  it("should be able to accept multiple arguments", () => {
    const exp = VerEx(
      "foo",
      lookahead("bar", "baz")
    );

    expect(exp).toMatchString("foobarbaz");

    expect(exp).not.toMatchString("foo");
    expect(exp).not.toMatchString("foobar");
    expect(exp).not.toMatchString("foobaz");
  });

  describe("lookahead.positive(expression)", () => {
    it("should be an alias for lookahead", () => {
      expect(lookahead.positive).toEqual(lookahead);
    });
  });

  describe("lookahead.negative(expression)", () => {
    it("should be a function", () => {
      expect(lookahead.negative).toBeInstanceOf(Function);
    });

    it("should ensure that the argument does not exist", () => {
      const exp = VerEx(
        "foo",
        lookahead.negative("bar")
      );

      let match: string;

      expect(exp).toMatchString("foobaz");
      [match] = exp.exec("foobaz");
      expect(match).toEqual("foo");

      exp.lastIndex = 0;

      expect(exp).toMatchString("fooban");
      [match] = exp.exec("fooban");
      expect(match).toEqual("foo");

      expect(exp).not.toMatchString("foobar");
    });

    it("should be able to accept multiple arguments", () => {
      const exp = VerEx(
        "foo",
        lookahead.negative("bar", "baz")
      );

      expect(exp).toMatchString("foobaz");
      expect(exp).toMatchString("foobar");
      expect(exp).toMatchString("fooban");

      expect(exp).not.toMatchString("foobarbaz");
    });
  });
});

describe("lookbehind(...expressions)", () => {
  it("should be a function", () => {
    expect(lookbehind).toBeInstanceOf(Function);
  });

  it("should ensure the argument exists", () => {
    const exp = VerEx(
      lookbehind("bar"),
      "foo"
    );

    expect(exp).toMatchString("barfoo");

    const [match] = exp.exec("barfoo");
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

      exp.lastIndex = 0;

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
