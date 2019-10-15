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

  it("should match more than one repetition", () => {
    expect(nFoos.test("foofoo")).toBeTruthy();

    const manyFoos = "foo".repeat(100);
    expect(nFoos.test(manyFoos)).toBeTruthy();
  });

  it("should not match zero repetitions", () => {
    expect(nFoos.test("")).toBeFalsy();
  });

  it.todo("should be greedy");
});
