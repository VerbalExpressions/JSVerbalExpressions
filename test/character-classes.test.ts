import {anyCharacterFrom, anyCharacterBut} from "../src/character-classes";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("anyCharacterFrom", () => {
  const exp = VerEx(/^/, anyCharacterFrom([["a", "f"], [0, 9], " ", "_"]), /$/);

  it("should be a function", () => {
    expect(anyCharacterFrom).toBeInstanceOf(Function);
  });

  it("should match a character in the passed set", () => {
    expect(exp).toMatchString("a");
    expect(exp).toMatchString("b");
    expect(exp).toMatchString("5");
    expect(exp).toMatchString(" ");
    expect(exp).toMatchString("_");
  });

  it("should not match a character not in the passed set", () => {
    expect(exp).not.toMatchString("g");
    expect(exp).not.toMatchString("%");
    expect(exp).not.toMatchString("A");
  });

  it("should not match an empty string", () => {
    expect(exp).not.toMatchString("");
  });

  it("should not match more than one character", () => {
    expect(exp).not.toMatchString("abc");
  });

  it("should work with predefined character classes", () => {
    const neitherDigitNorA = VerEx(anyCharacterFrom([/\d/, "A"]));

    expect(neitherDigitNorA).toMatchString("A");
    expect(neitherDigitNorA).toMatchString("9");
    expect(neitherDigitNorA).not.toMatchString("_");

    const nonWord = VerEx(anyCharacterFrom([/\w/]));

    expect(nonWord).toMatchString("a");
    expect(nonWord).toMatchString("9");
    expect(nonWord).toMatchString("_");
    expect(nonWord).not.toMatchString("%");
  });

  it("should work with hyphens", () => {
    const aHyphenOrC = VerEx(anyCharacterFrom(["a", "-", "c"]));

    expect(aHyphenOrC).toMatchString("a");
    expect(aHyphenOrC).toMatchString("-");
    expect(aHyphenOrC).toMatchString("c");
    expect(aHyphenOrC).not.toMatchString("b");
  });
});

describe("anyCharacterBut", () => {
  const exp = VerEx(
    /^/, anyCharacterBut([["a", "z"], ["A", "Z"], "_"]), /$/
  );

  it("should be a function", () => {
    expect(anyCharacterBut).toBeInstanceOf(Function);
  });

  it("should match a character not in passed set", () => {
    expect(exp).toMatchString("0");
    expect(exp).toMatchString("%");
    expect(exp).toMatchString("é");
    expect(exp).toMatchString("-");
  });

  it("should not match characters in passed set", () => {
    expect(exp).not.toMatchString("b");
    expect(exp).not.toMatchString("A");
    expect(exp).not.toMatchString("_");
  });

  it("should not match an empty string", () => {
    expect(exp).not.toMatchString("");
  });

  it("should not match more than one character", () => {
    expect(exp).not.toMatchString("100");
    expect(exp).not.toMatchString("!@#$");
  });

  it("should work with predefined character classes", () => {
    const neitherDigitNorA = VerEx(anyCharacterBut([/\d/, "A"]));

    expect(neitherDigitNorA).not.toMatchString("A");
    expect(neitherDigitNorA).not.toMatchString("9");
    expect(neitherDigitNorA).toMatchString("_");

    const nonWord = VerEx(anyCharacterBut([/\w/]));

    expect(nonWord).not.toMatchString("a");
    expect(nonWord).not.toMatchString("9");
    expect(nonWord).not.toMatchString("_");
    expect(nonWord).toMatchString("%");
  });

  it("should work with hyphens", () => {
    const notAHyphenOrC = VerEx(anyCharacterBut(["a", "-", "c"]));

    expect(notAHyphenOrC).not.toMatchString("a");
    expect(notAHyphenOrC).not.toMatchString("-");
    expect(notAHyphenOrC).not.toMatchString("c");
    expect(notAHyphenOrC).toMatchString("b");
  });
});
