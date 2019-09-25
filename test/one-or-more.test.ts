import oneOrMore from "../src/one-or-more";
import VerEx from "../src/verbalexpressions";

describe("oneOrMore(expression)", () => {
  it("should be a function", () => {
    expect(oneOrMore).toBeInstanceOf(Function);
  });

  const nFoos = VerEx(/^/, oneOrMore("foo"), /$/);
  it("should match one instance", () => {
    expect(nFoos.test("foo")).toBeTruthy();
  });

  it("should match two instances", () => {
    expect(nFoos.test("foofoo")).toBeTruthy();
  });

  it("should not match zero instances", () => {
    expect(nFoos.test("")).toBeFalsy();
  });

  it("should match several instances", () => {
    const manyFoos = "foo".repeat(100);
    expect(nFoos.test(manyFoos)).toBeTruthy();
  });
});
