import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterBut} from "../../src/character-classes";
import {maybe} from "../../src/maybe";
import {multiple} from "../../src/multiple";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
