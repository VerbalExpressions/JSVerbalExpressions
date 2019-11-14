import {concat} from "../src/concat";
import Fragment from "../src/types/fragment";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("concat(...expressions)", () => {
  it("should concatenate simple strings", () => {
    const abcdef = VerEx(
      /^/, concat("abc", "def"), /$/
    );

    expect(abcdef).toMatchString("abcdef");

    expect(abcdef).not.toMatchString("abc");
    expect(abcdef).not.toMatchString("def");
  });

  it("should concatenate raw expressions", () => {
    const httpMaybeSecure = VerEx(
      /^/, concat("http", "s", new Fragment("?")), /$/
    );

    expect(httpMaybeSecure).toMatchString("https");
    expect(httpMaybeSecure).toMatchString("http");

    expect(httpMaybeSecure).not.toMatchString("https?");
  });
});
