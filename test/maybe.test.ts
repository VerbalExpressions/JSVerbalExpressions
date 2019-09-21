import { maybe } from "../src/maybe";
import VerEx from "../src/verbalexpressions";

describe("maybe", () => {
  it("should export a function", () => {
    expect(maybe).toBeInstanceOf(Function);
  });

  it("should match strings with the argument", () => {
    expect(VerEx("foo", maybe("bar"), "baz").test("foobaz")).toBeTruthy();
  });

  it("should match strings without the argument", () => {
    expect(VerEx("foo", maybe("bar"), "baz").test("foobarbaz")).toBeTruthy();
  });

  it("should not match partial argument", () => {
    expect(VerEx("foo", maybe("bar"), "baz").test("foobrbaz")).toBeFalsy();
  });
});
