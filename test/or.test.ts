import or from "../src/or";
import VerEx from "../src/verex";

describe("or(...options)", () => {
  const abcOrDef = VerEx(/^/, or("abc", "def"), /$/);

  it("should be a function", () => {
    expect(or).toBeInstanceOf(Function);
  });

  it("should match either of the options", () => {
    expect(abcOrDef.test("abc")).toBeTruthy();
    expect(abcOrDef.test("def")).toBeTruthy();
  });

  it("should group each option", () => {
    // `abcOrDef` should not be `abc|def`

    expect(abcOrDef.test("abcef")).toBeFalsy();
    expect(abcOrDef.test("abdef")).toBeFalsy();
  });

  it("should wrap the alternation in a non-capturing group", () => {
    const exp = VerEx("a", or("b", "c"), "d");

    expect(exp.test("abd")).toBeTruthy();
    expect(exp.test("acd")).toBeTruthy();

    expect(exp.test("ab")).toBeFalsy();
    expect(exp.test("cd")).toBeFalsy();
  });

  it("should not match when neither of the options is present", () => {
    expect(abcOrDef.test("")).toBeFalsy();
  });

  it("should work with one argument", () => {
    const abc = VerEx(/^/, or("abc"), /$/);

    expect(abc.test("abc")).toBeTruthy();
    expect(abc.test("a")).toBeFalsy();
  });

  it("should work with multiple arguments", () => {
    const lipsum = "Cupidatat irure consectetur amet dolor aliqua";
    const words = lipsum.split(" ");
    const exp = VerEx(/^/, or(...words), /$/);

    for (const word of words) {
      expect(exp.test(word)).toBeTruthy();
    }
  });
});
