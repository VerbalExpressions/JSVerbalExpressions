import sanitize from "../src/util/sanitize";

const {raw} = String;

describe("sanitize", () => {
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

  it("should sanitize decimals in numbers", () => {
    expect(sanitize(1.5)).toEqual(raw`1\.5`);
  });

  it("should sanitize unusual numbers", () => {
    expect(sanitize(Infinity)).toEqual("Infinity");
    expect(sanitize(-Infinity)).toEqual("-Infinity");
    expect(sanitize(NaN)).toEqual("NaN");
  });
});
