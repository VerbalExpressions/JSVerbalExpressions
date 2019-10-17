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

  it("should be greedy", () => {
    const para = VerEx("<p>", oneOrMore(/./), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p> <p>bar</p>");
  });

  describe("oneOrMore.greedy(expression)", () => {
    it("should be an alias for oneOrMore", () => {
      expect(oneOrMore.greedy).toEqual(oneOrMore);
    });
  });

  describe("oneOrMore.lazy(expression)", () => {
    it("should be lazy", () => {
      const para = VerEx("<p>", oneOrMore.lazy(/./), "</p>");
      const [match] = para.exec("<p>foo</p> <p>bar</p>");

      expect(match).toEqual("<p>foo</p>");
    });
  });
});
