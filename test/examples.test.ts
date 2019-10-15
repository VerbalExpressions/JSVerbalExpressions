import anyCharacterBut from "../src/any-character-but";
import anyCharacterFrom from "../src/any-character-from";
import concat from "../src/concat";
import { digit, endOfLine, startOfLine, whitespaceCharacter } from "../src/constants";
import group from "../src/group";
import lookahead from "../src/lookahead";
import maybe from "../src/maybe";
import multiple from "../src/multiple";
import or from "../src/or";
import repeat from "../src/repeat";
import VerEx from "../src/verex";

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

  it("should match IP addresses", () => {
    const octet = or(
      concat("25", anyCharacterFrom([[0, 5]])), // 250–255
      concat("2", anyCharacterFrom([[0, 4]]), digit), // 200–249
      concat(maybe(anyCharacterFrom([0, 1])), maybe(digit), digit) // 0–199
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

  it.todo("should match email addresses");

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

  it("should match 24 hour time", () => {
    const hour = or(
      concat(maybe(anyCharacterFrom([[0, 1]])), digit),
      concat(2, anyCharacterFrom([[0, 3]]))
    );

    const zeroThroughFiftyNine = concat(
      anyCharacterFrom([[0, 5]]), digit
    );

    const time = VerEx(
      startOfLine,
      group(hour), ":",
      group(zeroThroughFiftyNine),
      maybe(concat(":", zeroThroughFiftyNine)),
      endOfLine
    );

    expect(time.test("23:50:00")).toBeTruthy();
    expect(time.test("14:00")).toBeTruthy();
    expect(time.test("22:09")).toBeTruthy();
    expect(time.test("23:00")).toBeTruthy();
    expect(time.test("9:30")).toBeTruthy();
    expect(time.test("09:30")).toBeTruthy();
    expect(time.test("19:30")).toBeTruthy();

    expect(time.test("27:30")).toBeFalsy();
    expect(time.test("13:70")).toBeFalsy();
    expect(time.test("9:60")).toBeFalsy();
    expect(time.test("12:24:63")).toBeFalsy();
  });

  it("should match dates", () => {
    // Please.
    // Don't do this in production.
    //
    // Instead, replace the hyphens with spaces and use `Date.parse`.

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const notAMultipleOfFour = or(
      concat(anyCharacterFrom([0, 2, 4, 6, 8]), anyCharacterBut([0, 4, 8])),
      concat(anyCharacterFrom([1, 3, 5, 7, 9]), anyCharacterBut([2, 6]))
    );

    const noIllegalXX00LeapDate = lookahead.negative(
      notAMultipleOfFour, "00-FEB-29"
    );

    const nineteenThroughNinetyNine = or(
      "19",
      concat(anyCharacterFrom([[2, 9]]), digit)
    );

    const noNonMultipleOfFourLeapDate = lookahead.negative(
      nineteenThroughNinetyNine, notAMultipleOfFour, "-FEB-29"
    );

    const noIllegalFebThirties = lookahead.negative(
      "FEB-3", anyCharacterFrom([0, 1])
    );

    const noIllegalThirtyFirsts = lookahead.negative(
      group.nonCapturing(or("APR", "JUN", "SEP", "NOV")), "-31"
    );

    const noZeroDates = lookahead.negative("00");

    const year = concat(
      nineteenThroughNinetyNine, digit, digit
    );

    const month = or(...months);

    const date = or(
      concat(anyCharacterFrom([[0, 2]]), anyCharacterFrom([[0, 9]])),
      concat(3, anyCharacterFrom([0, 1]))
    );

    const completeDate = VerEx(
      startOfLine,

      noIllegalXX00LeapDate, noNonMultipleOfFourLeapDate,
      group(year), "-",

      noIllegalFebThirties, noIllegalThirtyFirsts,
      group(month), "-",

      noZeroDates,
      group(date),

      endOfLine
    );

    expect(completeDate.test("1920-JAN-31")).toBeTruthy();
    expect(completeDate.test("1920-FEB-29")).toBeTruthy();
    expect(completeDate.test("2001-NOV-21")).toBeTruthy();
    expect(completeDate.test("2016-NOV-09")).toBeTruthy();
    expect(completeDate.test("2024-AUG-31")).toBeTruthy();
    expect(completeDate.test("1921-FEB-28")).toBeTruthy();
    expect(completeDate.test("1920-FEB-28")).toBeTruthy();
    expect(completeDate.test("9920-FEB-28")).toBeTruthy();
    expect(completeDate.test("2920-FEB-28")).toBeTruthy();

    const [
      , matchedYear, matchedMonth, matchedDate
    ] = completeDate.exec("1971-JAN-01");

    expect(matchedYear).toEqual("1971");
    expect(matchedMonth).toEqual("JAN");
    expect(matchedDate).toEqual("01");

    expect(completeDate.test("2900-FEB-29")).toBeFalsy();
    expect(completeDate.test("1921-FEB-29")).toBeFalsy();
    expect(completeDate.test("1920-JAN-35")).toBeFalsy();
    expect(completeDate.test("1920-FEB-30")).toBeFalsy();
    expect(completeDate.test("1920-FEB-31")).toBeFalsy();
    expect(completeDate.test("1920-FOO-28")).toBeFalsy();
    expect(completeDate.test("1920-APR-31")).toBeFalsy();
    expect(completeDate.test("1820-NOV-02")).toBeFalsy();
    expect(completeDate.test("1920-NOV-00")).toBeFalsy();
    expect(completeDate.test("1857-JAN-01")).toBeFalsy();
  });
});
