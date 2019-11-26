import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {digit} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {group} from "../../src/group";
import {maybe} from "../../src/maybe";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
