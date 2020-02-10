import {startOfLine} from "../../src/anchors";
import {anyCharacterBut} from "../../src/character-classes";
import {maybe} from "../../src/maybe";
import {multiple} from "../../src/multiple";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
