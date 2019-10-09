import sanitize from "../src/util/sanitize";

const raw = String.raw;

describe("sanitize(input)", () => {
  it("should escape escape-worthy characters", () => {
    const unescaped = raw`\.|*?+(){}^$:=[]`;
    const expected = raw`\\\.\|\*\?\+\(\)\{\}\^\$\:\=\[\]`;

    expect(sanitize(unescaped)).toEqual(expected);
  });

  it("should not unnecessarily escape characters", () => {
    const unescaped = "foo %@#! 1234";

    expect(sanitize(unescaped)).toEqual(unescaped);
  });

  it("should correctly escape a bunch of back slashes", () => {
    expect(sanitize(raw`\\\\`)).toEqual(raw`\\\\\\\\`);
    expect(sanitize(raw`\\.`)).toEqual(raw`\\\\\.`);
  });
});
