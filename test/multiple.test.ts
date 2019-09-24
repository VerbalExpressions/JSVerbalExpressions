import { endOfLine, startOfLine } from "../src/constants";
import multiple from "../src/multiple";
import VerEx from "../src/verbalexpressions";

describe("multiple()", () => {
  it("should be a function", () => {
    expect(multiple).toBeInstanceOf(Function);
  });
});

describe("multiple(arg)", () => {
  it("should match zero repetitions", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    expect(exp.test("")).toBeTruthy();
  });

  it("should match * number of repetitions", () => {
    const exp = VerEx(startOfLine, multiple("foo"), endOfLine);
    for (let i = 0; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });
});

describe("multiple(arg, n)", () => {
  const exp = VerEx(startOfLine, multiple("foo", 2), endOfLine);

  it("should match exactly `n` repetitions", () => {
    expect(exp.test("foo".repeat(2))).toBeTruthy();
  });

  it("should not match less than `n` repetitions", () => {
    expect(exp.test("")).toBeFalsy();
    expect(exp.test("foo")).toBeFalsy();
  });

  it("should not match more than `n` repetitions", () => {
    expect(exp.test("foo".repeat(3))).toBeFalsy();
    expect(exp.test("foo".repeat(4))).toBeFalsy();
  });
});

describe("multiple(arg, min, Infinity)", () => {
  const exp = VerEx(startOfLine, multiple("foo", 2, Infinity), endOfLine);

  it("should not match less than `min` repetitions", () => {
    expect(exp.test("")).toBeFalsy();
    expect(exp.test("foo")).toBeFalsy();
  });

  it("should match `min` repetitions", () => {
    expect(exp.test("foo".repeat(2))).toBeTruthy();
  });

  it("should match more than `min` repetitions", () => {
    for (let i = 2; i < 20; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });
});

describe("multiple(arg, min, max)", () => {
  const exp = VerEx(startOfLine, multiple("foo", 3, 10), endOfLine);

  it("should not match less than `min` repetitions", () => {
    expect(exp.test("")).toBeFalsy();
    expect(exp.test("foo".repeat(1))).toBeFalsy();
    expect(exp.test("foo".repeat(2))).toBeFalsy();
  });

  it("should match `min` repetitions", () => {
    expect(exp.test("foo".repeat(3))).toBeTruthy();
  });

  it("should match `min < x < max` repetitions", () => {
    for (let i = 4; i < 10; i++) {
      expect(exp.test("foo".repeat(i))).toBeTruthy();
    }
  });

  it("should match `max` repetitions", () => {
    expect(exp.test("foo".repeat(10))).toBeTruthy();
  });

  it("should not match more than `max` repetitions", () => {
    expect(exp.test("foo".repeat(11))).toBeFalsy();
    expect(exp.test("foo".repeat(12))).toBeFalsy();
    expect(exp.test("foo".repeat(13))).toBeFalsy();
  });
});
