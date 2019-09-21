import oneOrMore from "../src/oneOrMore";
import VerEx from "../src/verbalexpressions";
import { startOfLine, endOfLine } from "../src/constants";

describe("oneOrMore", () => {
  it("should export a function", () => {
    expect(oneOrMore).toBeInstanceOf(Function);
  });

  const nFoos = VerEx(startOfLine, oneOrMore("foo"), endOfLine);
  it("should match one instance", () => {
    expect(nFoos.test("foo")).toBeTruthy();
  });

  it("should match two instances", () => {
    expect(nFoos.test("foofoo")).toBeTruthy();
  });

  it("should not match zero instances", () => {
    expect(nFoos.test("")).toBeFalsy();
  });

  it("should match n instances", () => {
    const manyFoos = "foo".repeat(100);
    expect(nFoos.test(manyFoos)).toBeTruthy();
  });
});
