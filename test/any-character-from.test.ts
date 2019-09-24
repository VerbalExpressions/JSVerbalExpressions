import anyCharacterFrom from "../src/any-character-from";
import { endOfLine, startOfLine } from "../src/constants";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterFrom(characters)", () => {
  const exp = VerEx(startOfLine, anyCharacterFrom(["x", "y", "z"]), endOfLine);

  it("should be a function", () => {
    expect(anyCharacterFrom).toBeInstanceOf(Function);
  });

  it("should match any single character", () => {
    expect(exp.test("x")).toBeTruthy();
    expect(exp.test("y")).toBeTruthy();
    expect(exp.test("z")).toBeTruthy();

    expect(exp.test("zy")).toBeFalsy();
  });

  it("should not match other characters", () => {
    expect(exp.test("a")).toBeFalsy();
    expect(exp.test("m")).toBeFalsy();
  });

  it("should not match empty string", () => {
    expect(exp.test("")).toBeFalsy();
  });
});
