import anyOf from "../src/anyOf";
import { endOfLine, startOfLine } from "../src/constants";
import VerEx from "../src/verbalexpressions";

describe("anyOf", () => {
  it("should export a function", () => {
    expect(anyOf).toBeInstanceOf(Function);
  });

  const exp = VerEx(startOfLine, "foo ", anyOf("xyz"), endOfLine);
  it("should match any single character", () => {
    expect(exp.test("foo x")).toBeTruthy();
    expect(exp.test("foo y")).toBeTruthy();
    expect(exp.test("foo z")).toBeTruthy();
  });

  it("should not match empty string", () => {
    expect(exp.test("foo ")).toBeFalsy();
  });

  it("should not match additinal characters", () => {
    expect(exp.test("foo zy")).toBeFalsy();
  });
});
