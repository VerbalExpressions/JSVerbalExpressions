import {repeat} from "../src/repeat";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("repeat", () => {
  it("should be a function", () => {
    expect(repeat).toBeInstanceOf(Function);
  });

  describe("repeat.greedy", () => {
    it("should be an alias for repeat", () => {
      expect(repeat.greedy).toEqual(repeat);
    });
  });

  describe("repeat(expression, n)", () => {
    const exp = VerEx(/^/, repeat("foo", 2), /$/);

    it("should match exactly `n` repetitions", () => {
      expect(exp).toMatchString("foo".repeat(2));
    });

    it("should not match less than `n` repetitions", () => {
      expect(exp).not.toMatchString("");
      expect(exp).not.toMatchString("foo");
    });

    it("should not match more than `n` repetitions", () => {
      expect(exp).not.toMatchString("foo".repeat(3));
      expect(exp).not.toMatchString("foo".repeat(4));
    });
  });

  describe("repeat(expression, min, Infinity)", () => {
    const exp = VerEx(/^/, repeat("foo", 2, Infinity), /$/);

    it("should not match less than `min` repetitions", () => {
      expect(exp).not.toMatchString("");
      expect(exp).not.toMatchString("foo");
    });

    it("should match `min` repetitions", () => {
      expect(exp).toMatchString("foo".repeat(2));
    });

    it("should match more than `min` repetitions", () => {
      for (let i = 2; i < 20; i++) {
        expect(exp).toMatchString("foo".repeat(i));
      }
    });

    it("should be greedy", () => {
      const para = VerEx("<p>", repeat(/./, 0, Infinity), "</p>");
      const [match] = para.exec("<p>foo</p> <p>bar</p>");

      expect(match).toEqual("<p>foo</p> <p>bar</p>");
    });

    describe("repeat.lazy(expression, min, Infinity)", () => {
      it("should be lazy", () => {
        const para = VerEx("<p>", repeat.lazy(/./, 0, Infinity), "</p>");
        const [match] = para.exec("<p>foo</p> <p>bar</p>");

        expect(match).toEqual("<p>foo</p>");
      });
    });
  });

  describe("repeat(expression, min, max)", () => {
    const exp = VerEx(/^/, repeat("foo", 3, 10), /$/);

    it("should not match less than `min` repetitions", () => {
      expect(exp).not.toMatchString("");
      expect(exp).not.toMatchString("foo".repeat(1));
      expect(exp).not.toMatchString("foo".repeat(2));
    });

    it("should match `min` repetitions", () => {
      expect(exp).toMatchString("foo".repeat(3));
    });

    it("should match `min < x < max` repetitions", () => {
      for (let i = 4; i < 10; i++) {
        expect(exp).toMatchString("foo".repeat(i));
      }
    });

    it("should match `max` repetitions", () => {
      expect(exp).toMatchString("foo".repeat(10));
    });

    it("should not match more than `max` repetitions", () => {
      expect(exp).not.toMatchString("foo".repeat(11));
      expect(exp).not.toMatchString("foo".repeat(12));
      expect(exp).not.toMatchString("foo".repeat(13));
    });

    it("should be greedy", () => {
      const para = VerEx("<p>", repeat(/./, 0, 20), "</p>");
      const [match] = para.exec("<p>foo</p> <p>bar</p>");

      expect(match).toEqual("<p>foo</p> <p>bar</p>");
    });

    describe("repeat.lazy(expression, min, max)", () => {
      it("should be lazy", () => {
        const para = VerEx("<p>", repeat.lazy(/./, 0, 20), "</p>");
        const [match] = para.exec("<p>foo</p> <p>bar</p>");

        expect(match).toEqual("<p>foo</p>");
      });
    });
  });
});
