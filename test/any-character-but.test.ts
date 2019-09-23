import anyCharacterBut from "../src/any-character-but";
import { endOfLine, startOfLine } from "../src/constants";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterBut", () => {
  const anyCharacterButAbc = VerEx(
    startOfLine, anyCharacterBut(["a", "b", "c"]), endOfLine
  );

  it("should export a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed array", () => {
    expect(anyCharacterButAbc.test("d")).toBeTruthy();
  });

  it("should not match characters in passed array", () => {
    expect(anyCharacterButAbc.test("c")).toBeFalsy();
  });
});
