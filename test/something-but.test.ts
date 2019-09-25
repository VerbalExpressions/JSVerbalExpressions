import somethingBut from "../src/something-but";
import VerEx from "../src/verbalexpressions";

describe("somethingBut", () => {
  const somethingButAbc = VerEx(/^/, somethingBut("abc"), /$/);

  it("should be a function", () => {
    expect(somethingBut).toBeInstanceOf(Function);
  });

  it("should match characters not in arguments", () => {
    expect(somethingButAbc.test("def")).toBeTruthy();
  });

  it("should not match characters in arguments", () => {
    expect(somethingButAbc.test("ced")).toBeFalsy();
  });

  it("should not match empty string", () => {
    expect(somethingButAbc.test("")).toBeFalsy();
  });
});
