import backReference from "../src/back-reference";
import VerEx from "../src/verex";

describe("backReference(reference)", () => {
  it("should work with numbered references", () => {
    const exp = VerEx(/^/, /(foo)/, backReference(1), /$/);

    expect(exp.test("foofoo")).toBeTruthy();
  });

  it("should work with named references", () => {
    const exp = VerEx(/^/, /(?<a>foo)/, backReference("a"), /$/);

    expect(exp.test("foofoo")).toBeTruthy();
  });
});
