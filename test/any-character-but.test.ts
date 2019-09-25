import anyCharacterBut from "../src/any-character-but";
import VerEx from "../src/verbalexpressions";

describe("anyCharacterBut(characters)", () => {
  const anyCharacterButAbc = VerEx(
    /^/, anyCharacterBut(["a", "b", "c"]), /$/
  );

  it("should be a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed array", () => {
    expect(anyCharacterButAbc.test("d")).toBeTruthy();
  });

  it("should not match characters in passed array", () => {
    expect(anyCharacterButAbc.test("c")).toBeFalsy();
  });
});
