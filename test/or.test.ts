import or from "../src/or";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("or(...options)", () => {
  const abcOrDef = VerEx(/^/, or("abc", "def"), /$/);

  it("should be a function", () => {
    expect(or).toBeInstanceOf(Function);
  });

  it("should match either of the options", () => {
    expect(abcOrDef).toMatchString("abc");
    expect(abcOrDef).toMatchString("def");
  });

  it("should group each option", () => {
    // `abcOrDef` should not be `abc|def`

    expect(abcOrDef).not.toMatchString("abcef");
    expect(abcOrDef).not.toMatchString("abdef");
  });

  it("should wrap the alternation in a non-capturing group", () => {
    const exp = VerEx("a", or("b", "c"), "d");

    expect(exp).toMatchString("abd");
    expect(exp).toMatchString("acd");

    expect(exp).not.toMatchString("ab");
    expect(exp).not.toMatchString("cd");
  });

  it("should not match when neither of the options is present", () => {
    expect(abcOrDef).not.toMatchString("");
  });

  it("should work with one argument", () => {
    const abc = VerEx(/^/, or("abc"), /$/);

    expect(abc).toMatchString("abc");
    expect(abc).not.toMatchString("a");
  });
});
