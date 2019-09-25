import {
  anything,
  digit,
  endOfLine,
  something,
  startOfLine,
  whitespaceCharacter,
  wordCharacter
} from "../src/constants";
import oneOrMore from "../src/one-or-more";
import VerEx from "../src/verbalexpressions";

describe("startOfLine", () => {
  it("should match line that starts with specified string", () => {
    expect(VerEx(startOfLine, "foo").test("foobar")).toBeTruthy();
  });

  it("should not match line that does not start with specified string", () => {
    expect(VerEx(startOfLine, "bar").test("foobar")).toBeFalsy();
  });

  it("should not match if startOfLine is not the first argument", () => {
    expect(VerEx("foo", startOfLine).test("foobar")).toBeFalsy();
  });
});

describe("endOfLine", () => {
  it("should match line that starts with specified string", () => {
    expect(VerEx("bar", endOfLine).test("foobar")).toBeTruthy();
  });

  it("should not match line that does not start with specified string", () => {
    expect(VerEx("foo", endOfLine).test("foobar")).toBeFalsy();
  });

  it("should not match if endOfLine is not the last argument", () => {
    expect(VerEx(endOfLine, "bar").test("foobar")).toBeFalsy();
  });
});

describe("digit", () => {
  const aDigit = VerEx(/^/, digit, /$/);

  it("should match Arabic numeral characters", () => {
    expect(aDigit.test("0")).toBeTruthy();
    expect(aDigit.test("2")).toBeTruthy();
    expect(aDigit.test("8")).toBeTruthy();
  });

  it("should not match non-digit and digit-like characters", () => {
    expect(aDigit.test("a")).toBeFalsy();
    expect(aDigit.test("₉")).toBeFalsy();
    expect(aDigit.test("❾")).toBeFalsy();
    expect(aDigit.test("１")).toBeFalsy();
    expect(aDigit.test("2️⃣")).toBeFalsy();
  });
});

describe("wordCharacter", () => {
  const wordCharacters = VerEx(/^/, oneOrMore(wordCharacter), /$/);

  it("should match a–z and A–Z", () => {
    expect(wordCharacters.test("abcdefghijklmnopqrstuvwxyz")).toBeTruthy();
    expect(wordCharacters.test("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBeTruthy();
  });

  it("should match arabic numerals", () => {
    expect(wordCharacters.test("0123456789")).toBeTruthy();
  });

  it("should match an underscore", () => {
    expect(wordCharacters.test("_")).toBeTruthy();
  });

  it("should not match non-word characters", () => {
    expect(wordCharacters.test("-")).toBeFalsy();
    expect(wordCharacters.test("%")).toBeFalsy();
    expect(wordCharacters.test("ℳ")).toBeFalsy();
    expect(wordCharacters.test("µ")).toBeFalsy();
    expect(wordCharacters.test("👍")).toBeFalsy();
  });
});

describe("whitespaceCharacter", () => {
  const whitespaceCharacters = VerEx(/^/, oneOrMore(whitespaceCharacter), /$/);;

  it("should match whitespace characters", () => {
    const validWhitespace = [" ", "\f", "\n", "\r", "\t", "\v","\u00a0", "\u1680", "\u2000", "\u2001", "\u2002", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a", "\u2028", "\u2029", "\u202f", "\u205f", "\u3000", "\ufeff"];

    expect(whitespaceCharacters.test(validWhitespace.join(""))).toBeTruthy();
  });
});

describe("wordBoundary", () => {});

describe("anyCharacter", () => {});

describe("anything", () => {
  it("should match a random string", () => {
    expect(VerEx(anything).test("foobar" + Math.random())).toBeTruthy();
  });

  it("should match an empty string", () => {
    expect(VerEx(anything).test("")).toBeTruthy();
  });

  it("should require all other conditions", () => {
    expect(VerEx("foo", anything).test("bar")).toBeFalsy();
  });

  it("should match if all other conditions are met", () => {
    expect(VerEx("foo", anything).test("foobar")).toBeTruthy();
  });

  it("should match if all other conditions are met with anything being empty", () => {
    expect(VerEx("foo", anything, "bar").test("foobar")).toBeTruthy();
  });
});

describe("something", () => {
  it("should match a random string", () => {
    expect(VerEx(something).test("foobar" + Math.random())).toBeTruthy();
  });

  it("should not match an empty string", () => {
    expect(VerEx(something).test("")).toBeFalsy();
  });

  it("should require all other conditions", () => {
    expect(VerEx("foo", something).test("bar")).toBeFalsy();
  });

  it("should match if all other conditions are met", () => {
    expect(VerEx("foo", something).test("foobar")).toBeTruthy();
  });

  it("should not match if all other conditions are met with something being empty", () => {
    expect(VerEx("foo", something, "bar").test("foobar")).toBeFalsy();
  });
});
