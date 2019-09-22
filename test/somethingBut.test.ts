import { endOfLine, startOfLine } from "../src/constants";
import somethingBut from "../src/somethingBut";
import VerEx from "../src/verbalexpressions";

describe("somethingBut", () => {
  const somethingButAbc = VerEx(startOfLine, somethingBut("abc"), endOfLine);

  it("should export a function", () => {
    expect(somethingBut).toBeInstanceOf(Function);
  });

  it("should match characters not in arguments", () => {
    expect(somethingButAbc.test("def")).toBeTruthy();
  });

  it("should not match characters in arguments", () => {
    const exp = VerEx(startOfLine, somethingBut("abc"), endOfLine);
    expect(somethingButAbc.test("ced")).toBeFalsy();
  });

  it("should not match empty string", () => {
    expect(somethingButAbc.test("")).toBeFalsy();
  });
});
