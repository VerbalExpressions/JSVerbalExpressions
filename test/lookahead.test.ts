import lookahead from "../src/lookahead";
import VerEx from "../src/verex";

describe("lookahead(expression)", () => {
  it("should be a function", () => {
    expect(lookahead).toBeInstanceOf(Function);
  });

  it("should ensure the argument exists", () => {
    const exp = VerEx(
      "foo",
      lookahead("bar")
    );

    let match: string;

    expect(exp.test("foobar")).toBeTruthy();
    [match] = exp.exec("foobar");
    expect(match).toEqual("foo");
    expect(match).not.toEqual("foobar");

    expect(exp.test("foobaz")).toBeFalsy();
    expect(exp.test("fooban")).toBeFalsy();
  });

  it("should be able to accept multiple arguments", () => {
    const exp = VerEx(
      "foo",
      lookahead("bar", "baz")
    );

    expect(exp.test("foobarbaz")).toBeTruthy();

    expect(exp.test("foo")).toBeFalsy();
    expect(exp.test("foobar")).toBeFalsy();
    expect(exp.test("foobaz")).toBeFalsy();
  });
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

    expect(exp.test("foobaz")).toBeTruthy();
    [match] = exp.exec("foobaz");
    expect(match).toEqual("foo");

    expect(exp.test("fooban")).toBeTruthy();
    [match] = exp.exec("fooban");
    expect(match).toEqual("foo");

    expect(exp.test("foobar")).toBeFalsy();
  });

  it("should be able to accept multiple arguments", () => {
    const exp = VerEx(
      "foo",
      lookahead.negative("bar", "baz")
    );

    expect(exp.test("foobaz")).toBeTruthy();
    expect(exp.test("foobar")).toBeTruthy();
    expect(exp.test("fooban")).toBeTruthy();

    expect(exp.test("foobarbaz")).toBeFalsy();
  });
});
