import lookahead from "../src/lookahead";
import VerEx from "../src/verbalexpressions";

describe("lookahead", () => {
  it("should ensure the argument exists", () => {
    const exp = VerEx(
      "foo",
      lookahead("bar")
    );

    let match: string;

    expect(exp.test("foobar")).toBeTruthy();
    [match] = exp.exec("foobar");
    expect(match).toEqual("foo");

    expect(exp.test("foobaz")).toBeFalsy();
    expect(exp.test("fooban")).toBeFalsy();
  });
});

describe("lookahead.positive", () => {
  it("should be an alias for lookahead", () => {
    expect(lookahead.positive).toEqual(lookahead);
  });
});

describe("lookahead.negative", () => {
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
});
