import oneOrMore from "../src/one-or-more";
import VerEx from "../src/verex";

describe("oneOrMore(expression)", () => {
  it("should be a function", () => {
    expect(oneOrMore).toBeInstanceOf(Function);
  });

  const nFoos = VerEx(/^/, oneOrMore("foo"), /$/);
  it("should match one repetition", () => {
    expect(nFoos.test("foo")).toBeTruthy();
  });

  it("should match two repetitions", () => {
    expect(nFoos.test("foofoo")).toBeTruthy();
  });

  it("should not match zero repetitions", () => {
    expect(nFoos.test("")).toBeFalsy();
  });

  it("should match a hundred repetitions", () => {
    const manyFoos = "foo".repeat(100);
    expect(nFoos.test(manyFoos)).toBeTruthy();
  });
});
