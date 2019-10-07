import maybe from "../src/maybe";
import optionally from "../src/maybe";
import VerEx from "../src/verex";

describe("maybe(expression)", () => {
  const fooMaybeBarBaz = VerEx(/^/, maybe("bar"), /$/);

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

describe("optionally(expression)", () => {
  it("should be an alias for maybe", () => {
    expect(optionally).toEqual(maybe);
  });
});
