import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {digit} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {lookahead} from "../../src/lookaround";
import {zeroOrMore} from "../../src/multiple";
import {maybe, optionally} from "../../src/maybe";
import {oneOrMore} from "../../src/one-or-more";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
