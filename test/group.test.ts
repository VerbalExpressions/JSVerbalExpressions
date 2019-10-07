import { anything } from "../src/constants";
import group from "../src/group";
import maybe from "../src/maybe";
import VerEx from "../src/verex";

describe("group(...expressions)", () => {
  it("should be a function", () => {
    expect(group).toBeInstanceOf(Function);
  });

  it("should add a capture group that to the expression", () => {
    const exp = VerEx("foo", group("bar"), "baz");
    const [, result] = exp.exec("foobarbaz");
    expect(result).toEqual("bar");
  });

  it("should work with multiple arguments", () => {
    const exp = VerEx(group("http", maybe("s")), "://", group(anything));
    const [, protocol, domain] = exp.exec("https://google.com");
    expect(protocol).toEqual("https");
    expect(domain).toEqual("google.com");
  });
});

describe("group.capturing(...expressions)", () => {
  it("should be an alias for group", () => {
    expect(group.capturing).toEqual(group);
  });
});

describe("group.nonCapturing(...expressions)", () => {
  it("should be a function", () => {
    expect(group.nonCapturing).toBeInstanceOf(Function);
  });

  it("should not create capturing groups", () => {
    const exp = VerEx(
      group("http", maybe("s")),
      "://",
      group.nonCapturing(anything)
    );

    const [, protocol] = exp.exec("https://google.com");
    expect(protocol).toEqual("https");
  });

  it("should create a non-capturing group", () => {
    const exp = VerEx(group.nonCapturing("foo"));

    // Can't think of a way to test this without:
    // …using other functions. This seems like our best bet at the moment.
    expect(exp.source).toEqual("(?:foo)");
  });
});
