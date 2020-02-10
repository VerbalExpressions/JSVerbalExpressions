import {group, backReference} from "../src/group";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("group", () => {
  it("should be a function", () => {
    expect(group).toBeInstanceOf(Function);
  });

  it("should create a capturing group", () => {
    const exp = VerEx("foo", group("bar"), "baz");
    const [, result] = exp.exec("foobarbaz");

    expect(result).toEqual("bar");
  });

  it("should work with multiple arguments", () => {
    const exp = VerEx(group("https"), "://", group(/.*/));
    const [, protocol, domain] = exp.exec("https://google.com");

    expect(protocol).toEqual("https");
    expect(domain).toEqual("google.com");
  });

  describe("group.capturing", () => {
    it("should be an alias for group", () => {
      expect(group.capturing).toEqual(group);
    });
  });

  describe("group.nonCapturing", () => {
    it("should be a function", () => {
      expect(group.nonCapturing).toBeInstanceOf(Function);
    });

    it("should not create a capturing group", () => {
      const exp = VerEx(
        group("https"),
        "://",
        group.nonCapturing(/.*/)
      );

      const [, protocol] = exp.exec("https://google.com");

      expect(protocol).not.toEqual("google.com");
      expect(protocol).toEqual("https");
    });

    it("should create a non-capturing group", () => {
      const exp = VerEx(group.nonCapturing("foo"));

      // Can't think of a way to test this without
      // …using other functions. This seems like our best bet at the moment.
      expect(exp.source).not.toEqual("(foo)");
      expect(exp.source).not.toEqual("foo");
      expect(exp.source).toEqual("(?:foo)");
    });
  });

  describe("group.named", () => {
    it("should create a named group", () => {
      const exp = VerEx(
        group.named("a", "foo"),
        group.named("b", "bar")
      );

      const matches = exp.exec("foobar");

      expect(matches.groups).toEqual({
        a: "foo",
        b: "bar"
      });
    });
  });

  describe("group.capturing.named", () => {
    it("should be an alias for group.named", () => {
      expect(group.capturing.named).toEqual(group.named);
    });
  });
});

describe("backReference", () => {
  it("should work with numbered references", () => {
    const exp = VerEx(/^/, /(foo)/, backReference(1), /$/);

    expect(exp).toMatchString("foofoo");
  });

  it("should work with named references", () => {
    const exp = VerEx(/^/, /(?<a>foo)/, backReference("a"), /$/);

    expect(exp).toMatchString("foofoo");
  });
});
