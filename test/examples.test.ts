import {anyCharacterBut} from "../src/any-character-but";
import {anyCharacterFrom} from "../src/any-character-from";
import {concat} from "../src/concat";
import {digit, endOfLine, startOfLine} from "../src/constants";
import {group} from "../src/group";
import {lookahead} from "../src/lookahead";
import {maybe} from "../src/maybe";
import {multiple} from "../src/multiple";
import {or} from "../src/or";
import {repeat} from "../src/repeat";
import {VerEx} from "../src/verex";
import "./custom-matchers";

describe("complex expressions", () => {
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

    expect(exp).toMatchString("https://google.com/");
    expect(exp).toMatchString("http://www.msn.com/en-us");
    expect(exp).not.toMatchString("foobar");
    expect(exp).not.toMatchString("ftp://foo.bar");
  });

  it("should match simple protocols", () => {
    const protocol = or(VerEx("http", maybe("s"), "://"), "ftp://", "smtp://");
    const removeWww = maybe("www.");
    const domain = multiple(anyCharacterBut([" ", "/"]));
    const exp = VerEx(startOfLine, protocol, removeWww, domain);

    expect(exp).toMatchString("http://www.google.com");
    expect(exp).toMatchString("https://msn.com");
    expect(exp).toMatchString("ftp://192.168.0.1");
    expect(exp).toMatchString("smtp://imap.fastmail.com");
    expect(exp).not.toMatchString("foobar");
    expect(exp).toMatchString("http://some.com/lengthty/url.html");
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

    expect(ipAddress).toMatchString("192.168.0.1");
    expect(ipAddress).toMatchString("10.255.255.255");
    expect(ipAddress).toMatchString("172.16.254.1");
    expect(ipAddress).toMatchString("172.8.184.233");
    expect(ipAddress).toMatchString("127.0.0.1");

    expect(ipAddress).not.toMatchString("127x0x0x1");
    expect(ipAddress).not.toMatchString("١٢٣.१२३.೧೨೩.๑๒๓");
    expect(ipAddress).not.toMatchString("999.999.999.999");
  });

  it.todo("should match email addresses");

  it("should match hex colour codes", () => {
    const hexCharacter = anyCharacterFrom([["a", "f"], ["A", "F"], [0, 9]]);
    const hexColour = VerEx(
      startOfLine,
      "#",
      or(
        repeat(hexCharacter, 6),
        repeat(hexCharacter, 3)
      ),
      endOfLine
    );

    expect(hexColour).toMatchString("#FFF");
    expect(hexColour).toMatchString("#bae");
    expect(hexColour).toMatchString("#8ce060");
    expect(hexColour).toMatchString("#E6E6FA");

    expect(hexColour).not.toMatchString("E6E6FA");
    expect(hexColour).not.toMatchString("#fb0_7d");
    expect(hexColour).not.toMatchString("#9134");
    expect(hexColour).not.toMatchString("#");
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

    expect(time).toMatchString("23:50:00");
    expect(time).toMatchString("14:00");
    expect(time).toMatchString("22:09");
    expect(time).toMatchString("23:00");
    expect(time).toMatchString("9:30");
    expect(time).toMatchString("09:30");
    expect(time).toMatchString("19:30");

    expect(time).not.toMatchString("27:30");
    expect(time).not.toMatchString("13:70");
    expect(time).not.toMatchString("9:60");
    expect(time).not.toMatchString("12:24:63");
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

    expect(completeDate).toMatchString("1920-JAN-31");
    expect(completeDate).toMatchString("1920-FEB-29");
    expect(completeDate).toMatchString("2001-NOV-21");
    expect(completeDate).toMatchString("2016-NOV-09");
    expect(completeDate).toMatchString("2024-AUG-31");
    expect(completeDate).toMatchString("1921-FEB-28");
    expect(completeDate).toMatchString("1920-FEB-28");
    expect(completeDate).toMatchString("9920-FEB-28");
    expect(completeDate).toMatchString("2920-FEB-28");

    const [
      , matchedYear, matchedMonth, matchedDate
    ] = completeDate.exec("1971-JAN-01");

    expect(matchedYear).toEqual("1971");
    expect(matchedMonth).toEqual("JAN");
    expect(matchedDate).toEqual("01");

    expect(completeDate).not.toMatchString("2900-FEB-29");
    expect(completeDate).not.toMatchString("1921-FEB-29");
    expect(completeDate).not.toMatchString("1920-JAN-35");
    expect(completeDate).not.toMatchString("1920-FEB-30");
    expect(completeDate).not.toMatchString("1920-FEB-31");
    expect(completeDate).not.toMatchString("1920-FOO-28");
    expect(completeDate).not.toMatchString("1920-APR-31");
    expect(completeDate).not.toMatchString("1820-NOV-02");
    expect(completeDate).not.toMatchString("1920-NOV-00");
    expect(completeDate).not.toMatchString("1857-JAN-01");
  });
});
