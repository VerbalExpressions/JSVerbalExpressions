import anythingBut from "./anythingBut";
import VerEx from "./verbalexpressions";
import { startOfLine, endOfLine } from "./constants";

describe("anythingBut", () => {
  const anythingButAbc = VerEx(startOfLine, anythingBut("abc"), endOfLine);

  it("should export a function", () => {
    expect(anythingBut).toBeInstanceOf(Function);
  });

  it("should match characters not in arguments", () => {
    expect(anythingButAbc.test("def")).toBeTruthy();
  });

  it("should not match characters in arguments", () => {
    const exp = VerEx(startOfLine, anythingBut("abc"), endOfLine);
    expect(anythingButAbc.test("ced")).toBeFalsy();
  });

  it("should match empty string", () => {
    expect(anythingButAbc.test("")).toBeTruthy();
  });
});
