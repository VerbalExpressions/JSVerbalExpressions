import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {digit, wordCharacter} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {zeroOrMore} from "../../src/multiple";
import {oneOrMore} from "../../src/one-or-more";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
