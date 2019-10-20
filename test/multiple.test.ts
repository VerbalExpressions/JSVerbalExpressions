import multiple from "../src/multiple";
import zeroOrMore from "../src/multiple";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("multiple(expression)", () => {
  it("should be a function", () => {
    expect(multiple).toBeInstanceOf(Function);
  });

  it("should match zero repetitions", () => {
    const exp = VerEx(/^/, multiple("foo"), /$/);
    expect(exp).toMatchString("");
  });

  it("should match any number of repetitions", () => {
    const exp = VerEx(/^/, multiple("foo"), /$/);
    for (let i = 0; i < 20; i++) {
      expect(exp).toMatchString("foo".repeat(i));
    }
  });

  it("should be greedy", () => {
    const para = VerEx("<p>", multiple(/./), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p> <p>bar</p>");
  });

  describe("multiple.greedy(expression)", () => {
    it("should be an alias for multiple", () => {
      expect(multiple.greedy).toEqual(multiple);
    });
  });

  describe("multiple.lazy(expression)", () => {
    it("should be lazy", () => {
      const para = VerEx("<p>", multiple.lazy(/./), "</p>");
      const [match] = para.exec("<p>foo</p> <p>bar</p>");

      expect(match).toEqual("<p>foo</p>");
    });
  });
});

describe("zeroOrMore(expression)", () => {
  it("should be an alias for multiple", () => {
    expect(zeroOrMore).toEqual(multiple);
  });
});
