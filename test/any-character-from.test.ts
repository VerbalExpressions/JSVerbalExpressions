import anyCharacterFrom from "../src/any-character-from";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterFrom(characters)", () => {
  const exp = VerEx(/^/, anyCharacterFrom(["x", "y", "z", ["c", "f"]]), /$/);

  it("should be a function", () => {
    expect(anyCharacterFrom).toBeInstanceOf(Function);
  });

  it("should match a character in the passed set", () => {
    expect(exp.test("x")).toBeTruthy();
    expect(exp.test("y")).toBeTruthy();
    expect(exp.test("z")).toBeTruthy();
  });

  it("should match a character part of ranges in the passed set", () => {
    expect(exp.test("d")).toBeTruthy();
  });

  it("should not match more than one character", () => {
    expect(exp.test("xyz")).toBeFalsy();
  });

  it("should not match a character not in the passed set", () => {
    expect(exp.test("a")).toBeFalsy();
    expect(exp.test("m")).toBeFalsy();
  });

  it("should not match an empty string", () => {
    expect(exp.test("")).toBeFalsy();
  });
});
