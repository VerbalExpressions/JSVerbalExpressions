import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {whitespaceCharacter} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {group, backReference} from "../../src/group";
import {multiple} from "../../src/multiple";
import {oneOrMore} from "../../src/one-or-more";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import {anyCharacter, anything} from "../../src/wildcards";
import "../custom-matchers";

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
