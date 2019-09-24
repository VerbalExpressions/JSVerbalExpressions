import maybe from "../src/maybe";
import VerEx from "../src/verbalexpressions";
import { endOfLine, startOfLine } from "../src/constants";

describe("maybe", () => {
  const fooMaybeBarBaz = VerEx(startOfLine, maybe("bar"), endOfLine);

  it("should be a function", () => {
    expect(maybe).toBeInstanceOf(Function);
  });

  it("should match strings with the argument", () => {
    expect(fooMaybeBarBaz.test("bar")).toBeTruthy();
  });

  it("should match strings without the argument", () => {
    expect(fooMaybeBarBaz.test("")).toBeTruthy();
  });

  it("should not match strings with something instead of the argument", () => {
    expect(fooMaybeBarBaz.test("baz")).toBeFalsy();
  });
});
