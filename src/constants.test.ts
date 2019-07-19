import { startOfLine, endOfLine } from "./constants";
import VerEx from "./verbalexpressions";

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
