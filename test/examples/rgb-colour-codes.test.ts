import {anyCharacterFrom} from "../../src/character-classes";
import {digit, whitespaceCharacter} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {maybe} from "../../src/maybe";
import {zeroOrMore} from "../../src/multiple";
import {oneOrMore} from "../../src/one-or-more";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
      )
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
