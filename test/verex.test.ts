import {VerEx, VerExp} from "../src/verex";
import "./custom-matchers";

describe("VerEx", () => {
  it("should be a function", () => {
    expect(VerEx).toBeInstanceOf(Function);
  });

  describe("VerEx(...expressions)", () => {
    it("should return an instance of `RegExp`", () => {
      const expression = VerEx("foo");

      expect(expression).toBeInstanceOf(RegExp);
    });

    it("should correctly handle zero arguments", () => {
      expect(VerEx()).toEqual(/(?:)/);
    });

    it("should accept multiple strings", () => {
      const expression = VerEx("foo", "bar", "baz");

      expect(expression).toMatchString("foobarbaz");
    });

    it("should accept regular expressions", () => {
      const expression = VerEx(/^/, /foo/, /(?:bar)?/, /$/);

      expect(expression).toMatchString("foo");
      expect(expression).toMatchString("foobar");
    });

    it("should accept numbers", () => {
      const expression = VerEx(3.14159);

      expect(expression).toMatchString("3.14159");
      expect(expression).toMatchString("33.14159%");

      expect(expression).not.toMatchString("3014159");
    });
  });

  describe("VerEx(flags, ...expressions)", () => {
    describe("defaults", () => {
      it("should should set gm flags by default", () => {
        const exp = VerEx("foo");
        expect(exp.flags).toEqual("gm");
      });

      it("should work with an empty flags object", () => {
        const exp = VerEx({}, "foo");
        expect(exp.flags).toEqual("gm");
      });

      it("should extend defaults rather than replace them", () => {
        const exp = VerEx({
          ignoreCase: true,
          multiline: false
        }, "foo");

        expect(exp.flags).toEqual("gi");
      });
    });

    describe("ignoreCase", () => {
      describe("ignoreCase: true", () => {
        it("should allow case insensitive matches", () => {
          const foo = VerEx({ignoreCase: true}, /^/, "foo", /$/);

          expect(foo).toMatchString("foo");
          expect(foo).toMatchString("FOO");
          expect(foo).toMatchString("Foo");
        });
      });

      describe("ignoreCase: false", () => {
        it("should not allow case insensitive matches", () => {
          const foo = VerEx({ignoreCase: false}, /^/, "foo", /$/);

          expect(foo).toMatchString("foo");
          expect(foo).not.toMatchString("FOO");
          expect(foo).not.toMatchString("Foo");
        });
      });
    });

    describe("dotAll", () => {
      describe("dotAll: true", () => {
        it("should allow `.` to match line separators", () => {
          const dot = VerEx({dotAll: true}, /^/, /./, /$/);

          expect(dot).toMatchString("\n");
          expect(dot).toMatchString("\r");
          expect(dot).toMatchString("\u2028");
          expect(dot).toMatchString("\u2029");
        });
      });

      describe("dotAll: false", () => {
        it("should not allow `.` to match line separators", () => {
          const dot = VerEx({dotAll: false}, /^/, /./, /$/);

          expect(dot).not.toMatchString("\n");
          expect(dot).not.toMatchString("\r");
          expect(dot).not.toMatchString("\u2028");
          expect(dot).not.toMatchString("\u2029");
        });
      });
    });

    describe("global", () => {
      describe("global: true", () => {
        it("should allow matching all occurrences", () => {
          const foo = VerEx({global: true}, "foo");

          // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
          expect("foo foo foo".match(foo)).toEqual(["foo", "foo", "foo"]);
        });
      });

      describe("global: false", () => {
        it("should stop matching after first occurrence", () => {
          const foo = VerEx({global: false}, "foo");

          // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
          const result = "foo foo foo".match(foo);

          expect(result.length).toEqual(1);
          expect(result[0]).toEqual("foo");
          expect(result.index).toEqual(0);
          expect(result.input).toEqual("foo foo foo");
          expect(result.groups).toEqual(undefined);
        });
      });
    });

    describe("multiline", () => {
      describe("multiline: true", () => {
        it("should make line anchors match start and end of each line", () => {
          const fooOnALine = VerEx({multiline: true}, /^/, "foo", /$/);

          expect(fooOnALine).toMatchString("foo");
          expect(fooOnALine).toMatchString("bar\nfoo\nbaz");
          expect(fooOnALine).toMatchString("foo\nbar\nbaz");
          expect(fooOnALine).toMatchString("bar\nbaz\nfoo");
        });
      });

      describe("multiline: false", () => {
        it("should make line anchors match start and end of the string", () => {
          const fooOnALine = VerEx({multiline: false}, /^/, "foo", /$/);

          expect(fooOnALine).toMatchString("foo");
          expect(fooOnALine).not.toMatchString("bar\nfoo\nbaz");
          expect(fooOnALine).not.toMatchString("foo\nbar\nbaz");
          expect(fooOnALine).not.toMatchString("bar\nbaz\nfoo");
        });
      });
    });

    describe("sticky", () => {
      describe("sticky: true", () => {
        it("should begin matching from lastIndex", () => {
          const foo = VerEx({sticky: true}, "foo");

          expect(foo).not.toMatchString("## foo ##");

          foo.lastIndex = 3;
          expect(foo).toMatchString("## foo ##");

          foo.lastIndex = 5;
          expect(foo).not.toMatchString("## foo ##");
        });

        it("should should override the global flag", () => {
          const foo = VerEx(
            {global: true, sticky: true},
            "foo"
          );

          const matches = foo.exec("foo foo foo");

          expect(matches).not.toEqual(["foo", "foo", "foo"]);
          expect(matches.length).toEqual(1);
          expect(matches[0]).toEqual("foo");
          expect(matches.index).toEqual(0);
          expect(matches.input).toEqual("foo foo foo");
          expect(matches.groups).toEqual(undefined);

          foo.lastIndex = 3;
          expect(foo).toMatchString("## foo ##");
          expect(foo).not.toMatchString("## foo ##");
        });
      });

      describe("sticky: false", () => {
        it("should begin matching from the beginning of the string", () => {
          const foo = VerEx({sticky: false}, "foo");

          expect(foo).toMatchString("## foo ##");
          expect(foo).toMatchString("## foo ##");
          expect(foo).toMatchString("## foo ##");
        });
      });
    });

    describe("unicode", () => {
      describe("unicode: true", () => {
        it("should allow `.` to match astral symbols", () => {
          const dot = VerEx({unicode: true}, /^/, /./, /$/);

          expect(dot).toMatchString("𝌆");
        });

        it("should make quantifiers to apply to astral symbols", () => {
          const oneOrMore = VerEx({unicode: true}, /^/, /𝌆+/, /$/);
          const zeroOrMore = VerEx({unicode: true}, /^/, /𝌆*/, /$/);
          const three = VerEx({unicode: true}, /^/, /𝌆{3}/, /$/);
          const twoOrMore = VerEx({unicode: true}, /^/, /𝌆{2,}/, /$/);
          const twoToFour = VerEx({unicode: true}, /^/, /𝌆{2,4}/, /$/);

          expect(oneOrMore).toMatchString("𝌆𝌆𝌆");
          expect(zeroOrMore).toMatchString("𝌆𝌆𝌆");
          expect(three).toMatchString("𝌆𝌆𝌆");
          expect(twoOrMore).toMatchString("𝌆𝌆𝌆");
          expect(twoToFour).toMatchString("𝌆𝌆𝌆");
        });

        it("should allow character classes to match astral symbols", () => {
          const tetragram = VerEx({unicode: true}, /^/, /[𝌆]/u, /$/);

          expect(tetragram).toMatchString("𝌆");
        });

        it("should allow `\\D`, `\\S`, `\\W` to match astral symbols", () => {
          const notDigit = VerEx({unicode: true}, /^/, /\D/, /$/);
          const notWhitespace = VerEx({unicode: true}, /^/, /\S/, /$/);
          const notWordCharacter = VerEx({unicode: true}, /^/, /\W/, /$/);

          expect(notDigit).toMatchString("𝌆");
          expect(notWhitespace).toMatchString("𝌆");
          expect(notWordCharacter).toMatchString("𝌆");
        });

        it.todo("should permit unicode property escapes");
        it.todo("should allow code point escapes");
      });

      describe("unicode: false", () => {
        it("should not allow `.` to match astral symbols", () => {
          const dot = VerEx({unicode: false}, /^/, /./, /$/);

          expect(dot).not.toMatchString("𝌆");
        });

        it("should not allow quantifiers to apply to astral symbols", () => {
          const oneOrMore = VerEx({unicode: false}, /^/, /𝌆+/, /$/);
          const zeroOrMore = VerEx({unicode: false}, /^/, /𝌆*/, /$/);
          const three = VerEx({unicode: false}, /^/, /𝌆{3}/, /$/);
          const twoOrMore = VerEx({unicode: false}, /^/, /𝌆{2,}/, /$/);
          const twoToFour = VerEx({unicode: false}, /^/, /𝌆{2,4}/, /$/);

          expect(oneOrMore).not.toMatchString("𝌆𝌆𝌆");
          expect(zeroOrMore).not.toMatchString("𝌆𝌆𝌆");
          expect(three).not.toMatchString("𝌆𝌆𝌆");
          expect(twoOrMore).not.toMatchString("𝌆𝌆𝌆");
          expect(twoToFour).not.toMatchString("𝌆𝌆𝌆");
        });

        it("should not allow character classes to match astral symbols", () => {
          const tetragram = VerEx({unicode: false}, /^/, /[𝌆]/u, /$/);

          expect(tetragram).not.toMatchString("𝌆");
        });

        it("should not allow `\\D`, `\\S`, `\\W` to match astral symbols", () => {
          const notDigit = VerEx({unicode: false}, /^/, /\D/, /$/);
          const notWhitespace = VerEx({unicode: false}, /^/, /\S/, /$/);
          const notWordCharacter = VerEx({unicode: false}, /^/, /\W/, /$/);

          expect(notDigit).not.toMatchString("𝌆");
          expect(notWhitespace).not.toMatchString("𝌆");
          expect(notWordCharacter).not.toMatchString("𝌆");
        });

        it.todo("should not permit unicode property escapes");
        it.todo("should not allow code point escapes");
      });
    });
  });

  describe("VerEx.extend(flags)", () => {
    const VerExIM = VerEx.extend({
      ignoreCase: true,
      multiline: true
    });

    const exp = VerExIM("foo");

    expect(exp.global).toBe(true);
    expect(exp.ignoreCase).toBe(true);
    expect(exp.multiline).toBe(true);
    expect(exp.dotAll).toBe(false);
    expect(exp.unicode).toBe(false);
    expect(exp.sticky).toBe(false);
  });
});

describe("VerExp(...expressions)", () => {
  it("should be an alias for VerEx", () => {
    expect(VerExp).toEqual(VerEx);
  });
});
