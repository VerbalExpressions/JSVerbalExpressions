import {
  endOfLine,
  startOfLine,
  wordBoundary
} from "../src/constants";
import VerEx from "../src/verex";
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
  const expression = VerEx(wordBoundary, "foo", wordBoundary);

  it("should anchor matches to word boundaries", () => {
    expect(expression).toMatchString("bar foo baz?");
    expect(expression).toMatchString("baz-foo-bar");
    expect(expression).toMatchString("foo");

    expect(expression).not.toMatchString("foobar?");
    expect(expression).not.toMatchString("baz foo_ bar");
    expect(expression).not.toMatchString("foo33");
  });

  describe("nonWordBoundary", () => {});
});
