import {endOfLine} from "../../src/anchors";
import {whitespaceCharacter} from "../../src/character-escapes";
import {oneOrMore} from "../../src/one-or-more";
import {VerEx} from "../../src/verex";

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
