import {
  anyCharacter,
  anything,
  something
} from "../src/constants";
import VerEx from "../src/verex";
import "./custom-matchers";

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
