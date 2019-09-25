import anyCharacterBut from "../src/any-character-but";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterBut(characters)", () => {
  const exp = VerEx(
    /^/, anyCharacterBut(["a", "b", "c", ["m", "z"]]), /$/
  );

  it("should be a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed set", () => {
    expect(exp.test("d")).toBeTruthy();
  });

  it("should not match more than one character", () => {
    expect(exp.test("def")).toBeFalsy();
  });

  it("should not match characters in passed set", () => {
    expect(exp.test("c")).toBeFalsy();
  });

  it("should not match characters part of ranges in passed set", () => {
    expect(exp.test("n")).toBeFalsy();
  });

  it("should not match an empty string", () => {
    expect(exp.test("")).toBeFalsy();
  });
});
