import anyCharacterFrom from "../src/any-character-from";
import VerEx from "../src/verex";

describe("anyCharacterFrom(characters)", () => {
  const exp = VerEx(/^/, anyCharacterFrom([["a", "f"], [0, 9], " ", "_"]), /$/);

  it("should be a function", () => {
    expect(anyCharacterFrom).toBeInstanceOf(Function);
  });

  it("should match a character in the passed set", () => {
    expect(exp.test("a")).toBeTruthy();
    expect(exp.test("b")).toBeTruthy();
    expect(exp.test("5")).toBeTruthy();
    expect(exp.test(" ")).toBeTruthy();
    expect(exp.test("_")).toBeTruthy();
  });

  it("should not match more than one character", () => {
    expect(exp.test("abc")).toBeFalsy();
  });

  it("should not match a character not in the passed set", () => {
    expect(exp.test("g")).toBeFalsy();
    expect(exp.test("%")).toBeFalsy();
    expect(exp.test("A")).toBeFalsy();
  });

  it("should not match an empty string", () => {
    expect(exp.test("")).toBeFalsy();
  });
});
