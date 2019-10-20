import backReference from "../src/back-reference";
import VerEx from "../src/verex";
import "./custom-matchers";

describe("backReference(reference)", () => {
  it("should work with numbered references", () => {
    const exp = VerEx(/^/, /(foo)/, backReference(1), /$/);

    expect(exp).toMatchString("foofoo");
  });

  it("should work with named references", () => {
    const exp = VerEx(/^/, /(?<a>foo)/, backReference("a"), /$/);

    expect(exp).toMatchString("foofoo");
  });
});
