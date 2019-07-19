import multiple from "./multiple";
import VerEx from "./verbalexpressions";
import { startOfLine, endOfLine } from "./constants";

describe("multiple", () => {
  it("should export a function", () => {
    expect(multiple).toBeInstanceOf(Function);
  });

  it("should match zero times", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    expect(exp.test("")).toBeTruthy();
  });

  it("should match n times", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    for (let i = 0; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });

  it("should not match less than minTimes times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2), endOfLine);
    expect(exp.test("foo")).toBeFalsy();
  });

  it("should match exactly or more than minTimes times", () => {
    const exp = VerEx(startOfLine, multiple("foo", 2), endOfLine);
    for (let i = 2; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });

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
