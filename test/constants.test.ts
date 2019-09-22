import {  anything, endOfLine, something, startOfLine } from "../src/constants";
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
