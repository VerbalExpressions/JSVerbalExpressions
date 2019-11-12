import lookahead from "../src/lookahead";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("lookahead(expression)", () => {
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
