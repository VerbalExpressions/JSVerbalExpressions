import VerEx from "./verbalexpressions";
import or from "./or";

describe("or", () => {
  it("should export a function", () => {
    expect(or).toBeInstanceOf(Function);
  });

  it("should match either of the provided arguments", () => {
    const exp = VerEx(or("abc", "def"));
    expect(exp.test("fooabc")).toBeTruthy();
    expect(exp.test("defzzz")).toBeTruthy();
  });

  it("should match any number of arguments", () => {
    const lipsum = "Cupidatat irure consectetur amet dolor aliqua";
    const args = lipsum.split(" ");
    const exp = VerEx(or(...args));
    args.forEach(arg => expect(exp.test(arg)).toBeTruthy());
  });
});
