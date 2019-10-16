import repeat from "../src/repeat";
import VerEx from "../src/verex";

describe("repeat()", () => {
  it("should be a function", () => {
    expect(repeat).toBeInstanceOf(Function);
  });
});

describe("repeat(expression, n)", () => {
  const exp = VerEx(/^/, repeat("foo", 2), /$/);

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

describe("repeat(expression, min, Infinity)", () => {
  const exp = VerEx(/^/, repeat("foo", 2, Infinity), /$/);

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

  it("should be greedy", () => {
    const para = VerEx("<p>", repeat(/./, 0, Infinity), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p> <p>bar</p>");
  });
});

describe("repeat.lazy(expression, min, Infinity)", () => {
  it("should be lazy", () => {
    const para = VerEx("<p>", repeat.lazy(/./, 0, Infinity), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p>");
  });
});

describe("repeat(expression, min, max)", () => {
  const exp = VerEx(/^/, repeat("foo", 3, 10), /$/);

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

  it("should be greedy", () => {
    const para = VerEx("<p>", repeat(/./, 0, 20), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p> <p>bar</p>");
  });
});

describe("repeat.lazy(expression, min, max)", () => {
  it("should be lazy", () => {
    const para = VerEx("<p>", repeat.lazy(/./, 0, 20), "</p>");
    const [match] = para.exec("<p>foo</p> <p>bar</p>");

    expect(match).toEqual("<p>foo</p>");
  });
});
