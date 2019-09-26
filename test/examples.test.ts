import anyCharacterBut from "../src/any-character-but";
import anyCharacterFrom from "../src/any-character-from";
import concat from "../src/concat";
import { digit, endOfLine, startOfLine } from "../src/constants";
import maybe from "../src/maybe";
import multiple from "../src/multiple";
import or from "../src/or";
import repeat from "../src/repeat";
import VerEx from "../src/verbalexpressions";

describe("Complex expressions", () => {
  it("should match simple URLs", () => {
    const exp = VerEx(
      startOfLine,
      "http",
      maybe("s"),
      "://",
      maybe("www."),
      multiple(anyCharacterBut([" "])),
      endOfLine
    );

    expect(exp.test("https://google.com/")).toBeTruthy();
    expect(exp.test("http://www.msn.com/en-us")).toBeTruthy();
    expect(exp.test("foobar")).toBeFalsy();
    expect(exp.test("ftp://foo.bar")).toBeFalsy();
  });

  it("should match simple protocols", () => {
    const protocol = or(VerEx("http", maybe("s"), "://"), "ftp://", "smtp://");
    const removeWww = maybe("www.");
    const domain = multiple(anyCharacterBut([" ", "/"]));
    const exp = VerEx(startOfLine, protocol, removeWww, domain);

    expect(exp.test("http://www.google.com")).toBeTruthy();
    expect(exp.test("https://msn.com")).toBeTruthy();
    expect(exp.test("ftp://192.168.0.1")).toBeTruthy();
    expect(exp.test("smtp://imap.fastmail.com")).toBeTruthy();
    expect(exp.test("foobar")).toBeFalsy();
    expect(exp.test("http://some.com/lengthty/url.html")).toBeTruthy();
  });

  it("should sanitize special characters", () => {
    const exp = VerEx("[foo]", or(".", "\\w"));

    expect(exp.test("[foo].")).toBeTruthy();
    expect(exp.test("[foo]\\w")).toBeTruthy();
    expect(exp.test("[foo] ")).toBeFalsy();
    expect(exp.test("[foo]x")).toBeFalsy();
  });

  it("should sanitize dot in numbers", () => {
    const exp = VerEx(startOfLine, 1.5, endOfLine);

    expect(exp.test("105")).toBeFalsy();
    expect(exp.test("1.5")).toBeTruthy();
  });

  it("should match IP addresses", () => {
    const octet = or(
      concat("25", anyCharacterFrom([[0, 5]])),
      concat("2", anyCharacterFrom([[0, 4]]), digit),
      concat(maybe(anyCharacterFrom([0, 1])), maybe(digit), digit)
    );

    const ipAddress = VerEx(
      startOfLine,
      octet, ".", octet, ".", octet, ".", octet,
      endOfLine
    );

    expect(ipAddress.test("192.168.0.1")).toBeTruthy();
    expect(ipAddress.test("10.255.255.255")).toBeTruthy();
    expect(ipAddress.test("172.16.254.1")).toBeTruthy();
    expect(ipAddress.test("172.8.184.233")).toBeTruthy();
    expect(ipAddress.test("127.0.0.1")).toBeTruthy();

    expect(ipAddress.test("127x0x0x1")).toBeFalsy();
    expect(ipAddress.test("١٢٣.१२३.೧೨೩.๑๒๓")).toBeFalsy();
    expect(ipAddress.test("999.999.999.999")).toBeFalsy();
  });

  it("should match hex colour codes", () => {
    const hexCharacter = anyCharacterFrom([["a", "f"], ["A", "F"], [0, 9]]);
    const hexColour = VerEx(
      startOfLine,
      "#",
      or(
        repeat(hexCharacter, 3),
        repeat(hexCharacter, 6)
      ),
      endOfLine
    );

    expect(hexColour.test("#FFF")).toBeTruthy();
    expect(hexColour.test("#bae")).toBeTruthy();
    expect(hexColour.test("#8ce060")).toBeTruthy();
    expect(hexColour.test("#E6E6FA")).toBeTruthy();

    expect(hexColour.test("E6E6FA")).toBeFalsy();
    expect(hexColour.test("#fb0_7d")).toBeFalsy();
    expect(hexColour.test("#9134")).toBeFalsy();
    expect(hexColour.test("#")).toBeFalsy();
  });
});
