import {
  endOfLine,
  nonWordBoundary,
  startOfLine,
  wordBoundary
} from "../src/constants";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("startOfLine", () => {
  it("should anchor matches to the start of the line", () => {
    expect(VerEx(startOfLine, "foo")).toMatchString("foobar");
    expect(VerEx(startOfLine, "bar")).not.toMatchString("foobar");
  });

  it("should not allow matches when not the first argument to VerEx", () => {
    expect(VerEx("foo", startOfLine)).not.toMatchString("foobar");
  });
});

describe("endOfLine", () => {
  it("should anchor matches to the end of the line", () => {
    expect(VerEx("bar", endOfLine)).toMatchString("foobar");
    expect(VerEx("foo", endOfLine)).not.toMatchString("foobar");
  });

  it("should not allow matches when not the last argument to VerEx", () => {
    expect(VerEx(endOfLine, "bar")).not.toMatchString("foobar");
  });
});

describe("wordBoundary", () => {
  const fooWithinBoundaries = VerEx(wordBoundary, "foo", wordBoundary);

  it("should anchor matches to word boundaries", () => {
    expect(fooWithinBoundaries).toMatchString("bar foo baz?");
    expect(fooWithinBoundaries).toMatchString("baz-foo-bar");
    expect(fooWithinBoundaries).toMatchString("foo");

    expect(fooWithinBoundaries).not.toMatchString("foobar?");
    expect(fooWithinBoundaries).not.toMatchString("baz foo_ bar");
    expect(fooWithinBoundaries).not.toMatchString("foo33");
  });

  describe("nonWordBoundary", () => {
    const expression = VerEx(nonWordBoundary, "foo", nonWordBoundary);

    it("should anchor matches to non-word-boundaries", () => {
      expect(expression).toMatchString("bazfoobar");
      expect(expression).toMatchString("baz_foo_bar");
      expect(expression).toMatchString("bazfoo33");

      expect(expression).not.toMatchString("baz foo bar?");
      expect(expression).not.toMatchString("baz-foo-bar");
      expect(expression).not.toMatchString("foo");
      expect(expression).not.toMatchString("foo?");
    });
  });
});
