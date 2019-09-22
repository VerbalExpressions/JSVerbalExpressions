import { endOfLine, startOfLine } from "../src/constants";
import multiple from "../src/multiple";
import VerEx from "../src/verbalexpressions";

describe("multiple", () => {
  it("should export a function", () => {
    expect(multiple).toBeInstanceOf(Function);
  });
});

describe("multiple(arg)", () => {

  it("should match zero times", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    expect(exp.test("")).toBeTruthy();
  });

  it("should match * number of times", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    for (let i = 0; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });
});

describe("multiple(arg, n)", () => {
  it("should match exactly n times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2), endOfLine);
    expect(exp.test("")).toBeFalsy();
    expect(exp.test("foo")).toBeFalsy();
    expect(exp.test("foofoo")).toBeTruthy();
    expect(exp.test("foofoofoo")).toBeFalsy();
  });
});

describe("multiple(arg, min, Infinity)", () => {
  it("should not match less than `min` times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2, Infinity), endOfLine);
    expect(exp.test("foo")).toBeFalsy();
  });

  it("should match exactly or more than `min` times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2, Infinity), endOfLine);
    for (let i = 2; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });
});

describe("multiple(arg, min, max", () => {
  it("should not match less than maxTimes times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2, 10), endOfLine);
    expect(exp.test("foo".repeat(11))).toBeFalsy();
  });

  it("should match more than minTimes and exactly maxTimes times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2, 10), endOfLine);
    for (let i = 2; i <= 10; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });
});
