import {
  anyCharacter,
  anything,
  digit,
  endOfLine,
  something,
  startOfLine,
  whitespaceCharacter,
  wordBoundary,
  wordCharacter
} from "../src/constants";
import RawExpression from "../src/types/raw-expression";
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

describe("digit", () => {
  const aDigit = VerEx(/^/, digit, /$/);

  it("should match arabic numerals", () => {
    expect(aDigit).toMatchString("0");
    expect(aDigit).toMatchString("2");
    expect(aDigit).toMatchString("8");
  });

  it("should not match non-digit and digit-like characters", () => {
    expect(aDigit).not.toMatchString("a");
    expect(aDigit).not.toMatchString("₉");
    expect(aDigit).not.toMatchString("❾");
    expect(aDigit).not.toMatchString("１");
    expect(aDigit).not.toMatchString("2️⃣");
    expect(aDigit).not.toMatchString("١");
    expect(aDigit).not.toMatchString("१");
    expect(aDigit).not.toMatchString("೧");
    expect(aDigit).not.toMatchString("๑");
  });

  it.todo("should not match more than one character");
});

describe("wordCharacter", () => {
  const wordCharacters = VerEx(/^/, wordCharacter, new RawExpression("+"), /$/);

  it("should match a–z and A–Z", () => {
    expect(wordCharacters).toMatchString("abcdefghijklmnopqrstuvwxyz");
    expect(wordCharacters).toMatchString("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  });

  it("should match arabic numerals", () => {
    expect(wordCharacters).toMatchString("0123456789");
  });

  it("should match an underscore", () => {
    expect(wordCharacters).toMatchString("_");
  });

  it("should not match non-word characters", () => {
    expect(wordCharacters).not.toMatchString("-");
    expect(wordCharacters).not.toMatchString("é");
    expect(wordCharacters).not.toMatchString("%");
    expect(wordCharacters).not.toMatchString("ℳ");
    expect(wordCharacters).not.toMatchString("µ");
    expect(wordCharacters).not.toMatchString("👍");
  });

  it.todo("should not match more than one character");
});

describe("whitespaceCharacter", () => {
  const aWhitespaceCharacter = VerEx(/^/, whitespaceCharacter, /$/);

  it("should match whitespace characters", () => {
    const whitespaces = [" ", "\f", "\n", "\r", "\t", "\v", "\u00a0", "\u1680", "\u2000", "\u2001", "\u2002", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a", "\u2028", "\u2029", "\u202f", "\u205f", "\u3000", "\ufeff"];

    for (const whitespace of whitespaces) {
      expect(aWhitespaceCharacter).toMatchString(whitespace);
    }

    expect(aWhitespaceCharacter).not.toMatchString("a");
    expect(aWhitespaceCharacter).not.toMatchString("1");
    expect(aWhitespaceCharacter).not.toMatchString("-");
  });

  it.todo("should not match non-whitespace characters");

  it.todo("should not match more than one character");
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
});

describe("anyCharacter", () => {
  it("should match any character", () => {
    const expression = VerEx(anyCharacter);

    expect(expression).toMatchString("a");
    expect(expression).toMatchString("1");
    expect(expression).toMatchString("%");
    expect(expression).toMatchString("ℳ");
    expect(expression).toMatchString("µ");
    expect(expression).toMatchString("👍");
  });

  it("should not match line terminators", () => {
    expect(VerEx(anyCharacter)).not.toMatchString("\n");
    expect(VerEx(anyCharacter)).not.toMatchString("\r");
    expect(VerEx(anyCharacter)).not.toMatchString("\u2028");
    expect(VerEx(anyCharacter)).not.toMatchString("\u2029");
  });

  it.todo("should not match more than one character");
});

describe("anything", () => {
  it("should match a non-empty string", () => {
    expect(VerEx(anything)).toMatchString("foobar");
  });

  it("should match an empty string", () => {
    expect(VerEx(anything)).toMatchString("");
    expect(VerEx("foo", anything, "bar")).toMatchString("foobar");
  });

  it("should be usable in conjunction with other arguments", () => {
    expect(VerEx("foo", anything)).toMatchString("foobar");
    expect(VerEx("foo", anything)).not.toMatchString("bar");
  });
});

describe("something", () => {
  it("should match a non-empty string", () => {
    expect(VerEx(something)).toMatchString("foobar");
  });

  it("should not match an empty string", () => {
    expect(VerEx(something)).not.toMatchString("");
    expect(VerEx("foo", something, "bar")).not.toMatchString("foobar");
  });

  it("should be usable in conjunction with other arguments", () => {
    expect(VerEx("foo", something)).toMatchString("foobar");
    expect(VerEx("foo", something)).not.toMatchString("bar");
  });
});
