import {maybe, optionally} from "../src/maybe";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("maybe", () => {
  const maybeBar = VerEx(/^/, maybe("bar"), /$/);

  it("should be a function", () => {
    expect(maybe).toBeInstanceOf(Function);
  });

  it("should match strings with the argument", () => {
    expect(maybeBar).toMatchString("bar");
  });

  it("should match strings without the argument", () => {
    expect(maybeBar).toMatchString("");
  });

  it("should not match strings with something instead of the argument", () => {
    expect(maybeBar).not.toMatchString("baz");
  });

  it("should wrap the argument in a non-capturing group", () => {
    expect(maybeBar).not.toMatchString("ba");
  });

  it("should be greedy", () => {
    const exp = VerEx("'", maybe(/./), "'");
    const [match] = exp.exec("'''");

    expect(match).toEqual("'''");
  });

  describe("maybe.greedy", () => {
    it("should be an alias for maybe", () => {
      expect(maybe.greedy).toEqual(maybe);
    });
  });

  describe("maybe.lazy", () => {
    it("should be lazy", () => {
      const exp = VerEx("'", maybe.lazy(/./), "'");
      const [match] = exp.exec("'''");

      expect(match).toEqual("''");
    });
  });
});

describe("optionally", () => {
  it("should be an alias for maybe", () => {
    expect(optionally).toEqual(maybe);
  });
});
