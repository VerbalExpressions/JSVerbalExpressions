import {endOfLine, startOfLine} from "../src/anchors";
import {anyCharacterFrom, anyCharacterBut} from "../src/character-classes";
import {digit, whitespaceCharacter, wordCharacter} from "../src/character-escapes";
import {concat} from "../src/concat";
import {group, backReference} from "../src/group";
import {lookahead} from "../src/lookaround";
import {maybe, optionally} from "../src/maybe";
import {multiple, zeroOrMore} from "../src/multiple";
import {oneOrMore} from "../src/one-or-more";
import {or} from "../src/or";
import {repeat} from "../src/repeat";
import {VerEx} from "../src/verex";
import {anyCharacter, anything} from "../src/wildcards";
import "./custom-matchers";

describe("complex expressions", () => {
  test("simple urls", () => {
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

  test("simple protocols", () => {
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

  test("ip addresses", () => {
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

  test("email addresses", () => {
    // This is the regex used by <input type="email">
    // It's far from perfect, but good for example's sake.

    const alphanumericHyphen: any[] = [["a", "z"], ["A", "Z"], digit, "-"];
    const user = oneOrMore(
      anyCharacterFrom([wordCharacter, ...".!#$%&’*+/=?^`{|}~-".split("")])
    );

    const domainName = oneOrMore(anyCharacterFrom(alphanumericHyphen));

    const tld = zeroOrMore(
      concat(".", oneOrMore(anyCharacterFrom(alphanumericHyphen)))
    );

    const email = VerEx(
      startOfLine,
      user, "@", domainName, tld,
      endOfLine
    );

    expect(email).toMatchString("foo@example.com");
    expect(email).toMatchString("foo@example.co.uk");
    expect(email).toMatchString("foo_123@example.example");
    expect(email).toMatchString("foo_123@sub.example.co.us");
    expect(email).toMatchString("foo_123@localhost");

    expect(email).not.toMatchString("fooexample.com");
    expect(email).not.toMatchString("foo@");
    expect(email).not.toMatchString("@example.com");
  });

  test("hex colour codes", () => {
    const hexCharacter = anyCharacterFrom([["a", "f"], [0, 9]]);

    const hexColour = VerEx(
      {ignoreCase: true},
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

  test("rgb colours", () => {
    const leadingZeroes = zeroOrMore(0);

    const octet = concat(
      leadingZeroes,
      or(
        concat("25", anyCharacterFrom([[0, 5]])), // 250–255
        concat("2", anyCharacterFrom([[0, 4]]), digit), // 200–249
        concat(maybe(anyCharacterFrom([0, 1])), maybe(digit), digit) // 0–199
      )
    );

    const whitespace = zeroOrMore(whitespaceCharacter);
    const trailingZeroes = maybe(concat(".", oneOrMore(0)));
    const decimalPart = maybe(concat(".", oneOrMore(digit)));

    const zeroToHundred = or(
      concat(leadingZeroes, 100, trailingZeroes),
      concat(leadingZeroes, maybe(digit), digit, decimalPart)
    );

    const percentage = concat(zeroToHundred, "%");

    const rgb = VerEx(
      {ignoreCase: true},
      "rgb",
      "(", whitespace,
      or(
        concat(
          octet, whitespace, ",",
          whitespace, octet, whitespace, ",",
          whitespace, octet
        ),
        concat(
          percentage, whitespace, ",",
          whitespace, percentage, whitespace, ",",
          whitespace, percentage
        ),
      ),
      whitespace, ")"
    );

    expect(rgb).toMatchString("rgb(0,0,0)");
    expect(rgb).toMatchString("RGB(124, 100, 0)");
    expect(rgb).toMatchString("rgb(255,255,255)");
    expect(rgb).toMatchString("rgb(235,205,195)");
    expect(rgb).toMatchString("Rgb( 0255, 00001, 02)");
    expect(rgb).toMatchString("Rgb(0255  ,01, 022)");
    expect(rgb).toMatchString("rgb(10%,10%,10%)");
    expect(rgb).toMatchString("rgb(100.0%, 2.5%, 0%)");
    expect(rgb).toMatchString("rgb(00010%, 0002%, 001%)");

    expect(rgb).not.toMatchString("rgb (0,0,0)");
    expect(rgb).not.toMatchString("rgb (0%,0%,0%)");
    expect(rgb).not.toMatchString("rgb(0,0,0,0)");
    expect(rgb).not.toMatchString("rgb(0,0)");
    expect(rgb).not.toMatchString("rgb(256,0,0)");
    expect(rgb).not.toMatchString("rgb(100.2,0,0)");
    expect(rgb).not.toMatchString("rgb(120%,10%,1%)");
    expect(rgb).not.toMatchString("rgb(255, 10%, 0)");
    expect(rgb).not.toMatchString("rgb(10%, 255, 0)");
  });

  test("camelcase to words", () => {
    const capital = VerEx(
      lookahead(anyCharacterFrom([["A", "Z"]]))
    );

    expect("camelCaseFtw".split(capital)).toEqual(["camel", "Case", "Ftw"]);
    expect("wordWord927".split(capital)).toEqual(["word", "Word927"]);
  });

  test("strip trailing whitespace", () => {
    const trailingWhitespace = VerEx(
      {multiline: true},
      oneOrMore(whitespaceCharacter),
      endOfLine
    );

    const whitespaceFilledString = `
      foobar\r\v
      a b c\t\u00A0
      def\u2000\u2002\u2002
      ghi\u2001\u2001
      jkl\u2006
      mno\u2007\u2008\u2009\u200A
    `;

    const whitespaceLess = `
      foobar
      a b c
      def
      ghi
      jkl
      mno`;

    expect(
      whitespaceFilledString.replace(trailingWhitespace, "")
    ).toEqual(whitespaceLess);
  });

  test("usernames", () => {
    const username = VerEx(
      startOfLine,
      repeat(wordCharacter, 3, 16),
      endOfLine
    );

    expect(username).toMatchString("AzureDiamond");
    expect(username).toMatchString("john_doe_73");

    expect(username).not.toMatchString("probably-too-long");
    expect(username).not.toMatchString("no");
    expect(username).not.toMatchString("😀");
    expect(username).not.toMatchString("john&i");
    expect(username).not.toMatchString("has spaces");
  });

  test("simple passwords", () => {
    const validSpecialCharacters = "~`!@#$%^&*()-+={[}]|\\:;\"'<,>.?/".split("");
    const validCharacter = anyCharacterFrom([
      wordCharacter,
      ...validSpecialCharacters
    ]);

    const atLeastOneDigit = lookahead(anything, digit);
    const atLeastOneAlpha = lookahead(anything, anyCharacterFrom([["a", "z"]]));
    const atLeastOneSpecial = lookahead(anything, anyCharacterFrom(validSpecialCharacters));

    const password = VerEx(
      atLeastOneDigit,
      atLeastOneSpecial,
      atLeastOneAlpha,
      repeat(validCharacter, 12, Infinity)
    );

    expect(password).toMatchString("foobarbaz123!@#");

    expect(password).not.toMatchString("foo1!");
    expect(password).not.toMatchString("foobarbaz____");
    expect(password).not.toMatchString("foobarbaz1234");
    expect(password).not.toMatchString("1234567890!@#$%^&*()");
  });

  test("floating point numbers", () => {
    const maybeSign = maybe(anyCharacterFrom(["+", "-"]));

    const noLonePoint = lookahead(
      or(
        concat(".", digit),
        digit
      )
    );

    const floatingPoint = VerEx(
      startOfLine,
      maybeSign,
      noLonePoint,
      maybe(oneOrMore(digit)),
      maybe("."), zeroOrMore(digit),
      optionally(concat(
        anyCharacterFrom(["e", "E"]), maybeSign, oneOrMore(digit)
      )),
      endOfLine
    );

    expect(floatingPoint).toMatchString("1.1e+1");
    expect(floatingPoint).toMatchString(".1e1");
    expect(floatingPoint).toMatchString(".1e+1");
    expect(floatingPoint).toMatchString("1.e1");
    expect(floatingPoint).toMatchString("1.e+1");
    expect(floatingPoint).toMatchString("1.1");
    expect(floatingPoint).toMatchString(".1");
    expect(floatingPoint).toMatchString("1.");
    expect(floatingPoint).toMatchString("1");
    expect(floatingPoint).toMatchString("987");
    expect(floatingPoint).toMatchString("+4");
    expect(floatingPoint).toMatchString("-8");
    expect(floatingPoint).toMatchString("0.1");
    expect(floatingPoint).toMatchString(".987");
    expect(floatingPoint).toMatchString("+4.0");
    expect(floatingPoint).toMatchString("-0.8");
    expect(floatingPoint).toMatchString("1e2");
    expect(floatingPoint).toMatchString("0.2e2");
    expect(floatingPoint).toMatchString("3.e2");
    expect(floatingPoint).toMatchString(".987e2");
    expect(floatingPoint).toMatchString("+4e-1");
    expect(floatingPoint).toMatchString("-8.e+2");

    expect(floatingPoint).not.toMatchString(".");
  });

  test("html tags", () => {
    const tagName = oneOrMore(anyCharacterFrom([["a", "z"]]));

    const htmlTag = VerEx(
      startOfLine,
      "<", group(tagName), group(multiple.lazy(anyCharacter)),
      or(
        concat(">", anything, "</", backReference(1), ">"),
        concat(oneOrMore(whitespaceCharacter), "/>")
      ),
      endOfLine
    );

    expect(htmlTag).toMatchString("<html>...</html>");
    expect(htmlTag).toMatchString("<html></html>");
    expect(htmlTag).toMatchString("<input type='email'></input>");
    expect(htmlTag).toMatchString("<img src='/img.jpg' />");
    expect(htmlTag).toMatchString("<span><span>foo</span></span>");

    const [, ...groups] = htmlTag.exec("<span><span>foo</span></span>");
    expect(groups).not.toEqual(["span", "><span>foo</span></span>"]);
    expect(groups).toEqual(["span", ""]);

    expect(htmlTag).not.toMatchString("<html>");
    expect(htmlTag).not.toMatchString("</foo><foo>");
    expect(htmlTag).not.toMatchString("<foo>...<bar>");
  });

  test("playing cards", () => {
    const spades = anyCharacterFrom([["🂡", "🂮"]]);
    const hearts = anyCharacterFrom([["🂱", "🂾"]]);
    const diamonds = anyCharacterFrom([["🃁", "🃎"]]);
    const clubs = anyCharacterFrom([["🃑", "🃞"]]);

    const knights = anyCharacterFrom(["🂬", "🂼", "🃌", "🃜"]);

    const playingCard = VerEx(
      {unicode: true},
      startOfLine,
      lookahead.negative(knights),
      or(spades, hearts, diamonds, clubs),
      endOfLine
    );

    expect(playingCard).toMatchString("🃁");
    expect(playingCard).toMatchString("🂭");
    expect(playingCard).toMatchString("🂳");
    expect(playingCard).toMatchString("🂫");
    expect(playingCard).toMatchString("🃔");

    expect(playingCard).not.toMatchString("🂬");
    expect(playingCard).not.toMatchString("🃟");
    expect(playingCard).not.toMatchString("🂠");
  });

  test("24 hour time", () => {
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
      maybe(concat(":", group(zeroThroughFiftyNine))),
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

  test("dates", () => {
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
      group.named('year', year), "-",

      noIllegalFebThirties, noIllegalThirtyFirsts,
      group.named('month', month), "-",

      noZeroDates,
      group.named('date', date),

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

    const {groups} = completeDate.exec("1971-JAN-01");

    expect(groups.year).toEqual("1971");
    expect(groups.month).toEqual("JAN");
    expect(groups.date).toEqual("01");

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
