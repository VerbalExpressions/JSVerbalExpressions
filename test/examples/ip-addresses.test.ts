import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {digit} from "../../src/character-escapes";
import {concat} from "../../src/concat";
import {maybe} from "../../src/maybe";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
