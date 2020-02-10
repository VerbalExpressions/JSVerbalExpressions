import {endOfLine, startOfLine} from "../../src/anchors";
import {wordCharacter} from "../../src/character-escapes";
import {repeat} from "../../src/repeat";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

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
