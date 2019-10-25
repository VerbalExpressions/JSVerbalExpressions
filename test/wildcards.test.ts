import {
  anyCharacter,
  anything,
  something
} from "../src/constants";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("anyCharacter", () => {
  const aCharacter = VerEx(/^/, anyCharacter, /$/);

  it("should match any character", () => {
    expect(aCharacter).toMatchString("a");
    expect(aCharacter).toMatchString("1");
    expect(aCharacter).toMatchString("%");
    expect(aCharacter).toMatchString("ℳ");
    expect(aCharacter).toMatchString("µ");
    expect(aCharacter).toMatchString("👍");
  });

  it("should not match line terminators", () => {
    expect(aCharacter).not.toMatchString("\n");
    expect(aCharacter).not.toMatchString("\r");
    expect(aCharacter).not.toMatchString("\u2028");
    expect(aCharacter).not.toMatchString("\u2029");
  });

  it("should not match more than one character", () => {
    expect(aCharacter).not.toMatchString("abc");
  });
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
