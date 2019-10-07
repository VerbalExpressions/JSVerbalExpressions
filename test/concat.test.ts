import concat from "../src/concat";
import RawExpression from "../src/types/raw-expression";
import VerEx from "../src/verex";

describe("concat(...expressions)", () => {
  it("should concatenate simple strings", () => {
    const abcdef = VerEx(
      /^/, concat("abc", "def"), /$/
    );

    expect(abcdef.test("abcdef")).toBeTruthy();

    expect(abcdef.test("abc")).toBeFalsy();
    expect(abcdef.test("def")).toBeFalsy();
  });

  it("should concatenate raw expressions", () => {
    const httpMaybeSecure = VerEx(
      /^/, concat("http", "s", new RawExpression("?")), /$/
    );

    expect(httpMaybeSecure.test("https")).toBeTruthy();
    expect(httpMaybeSecure.test("http")).toBeTruthy();

    expect(httpMaybeSecure.test("https?")).toBeFalsy();
  });
});
