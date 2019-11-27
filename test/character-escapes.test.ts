import {
  digit,
  nonDigit,
  nonWhitespaceCharacter,
  nonWordCharacter,
  whitespaceCharacter,
  wordCharacter
} from "../src/character-escapes";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("digit", () => {
  const aDigit = VerEx(/^/, digit, /$/);

  it("should match arabic numerals", () => {
    for (let i = 0; i <= 9; i++) {
      expect(aDigit).toMatchString(String(i));
    }
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

  it("should not match more than one character", () => {
    expect(aDigit).not.toMatchString("123");
  });
});

describe("nonDigit", () => {
  const aNonDigit = VerEx(/^/, nonDigit, /$/);

  it("should not match arabic numerals", () => {
    expect(aNonDigit).not.toMatchString("1");
  });

  it("should match non-digit characters", () => {
    expect(aNonDigit).toMatchString("a");
    expect(aNonDigit).toMatchString("₉");
    expect(aNonDigit).toMatchString("❾");
    expect(aNonDigit).toMatchString("１");
  });

  it("should not match more than one character", () => {
    expect(aNonDigit).not.toMatchString("abc");
  });
});

describe("wordCharacter", () => {
  const aWordCharacter = VerEx(/^/, wordCharacter, /$/);

  it("should match a–z and A–Z", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (const alpha of alphabet.split("")) {
      expect(aWordCharacter).toMatchString(alpha);
      expect(aWordCharacter).toMatchString(alpha.toUpperCase());
    }
  });

  it("should match arabic numerals", () => {
    for (let i = 0; i <= 9; i++) {
      expect(aWordCharacter).toMatchString(String(i));
    }
  });

  it("should match an underscore", () => {
    expect(aWordCharacter).toMatchString("_");
  });

  it("should not match non-word characters", () => {
    expect(aWordCharacter).not.toMatchString("-");
    expect(aWordCharacter).not.toMatchString("é");
    expect(aWordCharacter).not.toMatchString("%");
    expect(aWordCharacter).not.toMatchString("ℳ");
    expect(aWordCharacter).not.toMatchString("µ");
    expect(aWordCharacter).not.toMatchString("👍");
  });

  it("should not match more than one character", () => {
    expect(aWordCharacter).not.toMatchString("abc");
  });
});

describe("nonWordCharacter", () => {
  const aNonWordCharacter = VerEx(/^/, nonWordCharacter, /$/);

  it("should not match a–z and A–Z", () => {
    expect(aNonWordCharacter).not.toMatchString("a");
    expect(aNonWordCharacter).not.toMatchString("A");
  });

  it("should not match arabic numerals", () => {
    expect(aNonWordCharacter).not.toMatchString("1");
    expect(aNonWordCharacter).not.toMatchString("9");
  });

  it("should not match an underscore", () => {
    expect(aNonWordCharacter).not.toMatchString("_");
  });

  it("should match non-word characters", () => {
    expect(aNonWordCharacter).toMatchString("-");
    expect(aNonWordCharacter).toMatchString("%");
    expect(aNonWordCharacter).toMatchString("£");
  });

  it("should not match more than one character", () => {
    expect(aNonWordCharacter).not.toMatchString("***");
  });
});

describe("whitespaceCharacter", () => {
  const aWhitespaceCharacter = VerEx(/^/, whitespaceCharacter, /$/);

  it("should match whitespace characters", () => {
    const whitespaces = " \f\n\r\t\v\u00A0\u1680\u2000\u2001\u2002\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF";

    for (const whitespace of whitespaces.split("")) {
      expect(aWhitespaceCharacter).toMatchString(whitespace);
    }
  });

  it("should not match non-whitespace characters", () => {
    expect(aWhitespaceCharacter).not.toMatchString("a");
    expect(aWhitespaceCharacter).not.toMatchString("1");
    expect(aWhitespaceCharacter).not.toMatchString("-");
  });

  it("should not match more than one character", () => {
    expect(aWhitespaceCharacter).not.toMatchString("    ");
  });
});

describe("nonWhitespaceCharacter", () => {
  const aNonWhitespaceCharacter = VerEx(/^/, nonWhitespaceCharacter, /$/);

  it("should not match whitespace characters", () => {
    expect(aNonWhitespaceCharacter).not.toMatchString(" ");
    expect(aNonWhitespaceCharacter).not.toMatchString("\t");
  });

  it("should match non-whitespace characters", () => {
    expect(aNonWhitespaceCharacter).toMatchString("a");
    expect(aNonWhitespaceCharacter).toMatchString("1");
    expect(aNonWhitespaceCharacter).toMatchString("£");
  });

  it("should not match more than one character", () => {
    expect(aNonWhitespaceCharacter).not.toMatchString("abc");
  });
});
