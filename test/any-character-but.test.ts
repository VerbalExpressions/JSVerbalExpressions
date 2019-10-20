import anyCharacterBut from "../src/any-character-but";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("anyCharacterBut(characters)", () => {
  const exp = VerEx(
    /^/, anyCharacterBut([["a", "z"], ["A", "Z"], "_"]), /$/
  );

  it("should be a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed set", () => {
    expect(exp).toMatchString("0");
    expect(exp).toMatchString("%");
    expect(exp).toMatchString("é");
    expect(exp).toMatchString("-");
  });

  it("should not match characters in passed set", () => {
    expect(exp).not.toMatchString("b");
    expect(exp).not.toMatchString("A");
    expect(exp).not.toMatchString("_");
  });

  it("should not match an empty string", () => {
    expect(exp).not.toMatchString("");
  });

  it("should not match more than one character", () => {
    expect(exp).not.toMatchString("100");
    expect(exp).not.toMatchString("!@#$");
  });

  it.todo("should work with predefined character classes");
});
