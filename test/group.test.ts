import group from "../src/group";
import VerEx from "../src/verbalexpressions";
import { anything } from "../src/constants";
import { maybe } from "../src/maybe";

describe("group", () => {
  it("should export a function", () => {
    expect(group).toBeInstanceOf(Function);
  });

  it("should add a capture gorup that to the expression", () => {
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
