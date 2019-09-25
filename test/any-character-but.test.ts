import anyCharacterBut from "../src/any-character-but";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterBut(characters)", () => {
  const exp = VerEx(
    /^/, anyCharacterBut([["a", "z"], ["A", "Z"], "_"]), /$/
  );

  it("should be a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed set", () => {
    expect(exp.test("0")).toBeTruthy();
    expect(exp.test("%")).toBeTruthy();
    expect(exp.test("é")).toBeTruthy();
    expect(exp.test("-")).toBeTruthy();
  });

  it("should not match more than one character", () => {
    expect(exp.test("100")).toBeFalsy();
    expect(exp.test("!@#$")).toBeFalsy();
  });

  it("should not match characters in passed set", () => {
    expect(exp.test("b")).toBeFalsy();
    expect(exp.test("A")).toBeFalsy();
    expect(exp.test("_")).toBeFalsy();
  });

  it("should not match an empty string", () => {
    expect(exp.test("")).toBeFalsy();
  });
});
