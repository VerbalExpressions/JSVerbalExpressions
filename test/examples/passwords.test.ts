import {anyCharacterFrom} from "../../src/character-classes";
import {digit, wordCharacter} from "../../src/character-escapes";
import {lookahead} from "../../src/lookaround";
import {repeat} from "../../src/repeat";
import {VerEx} from "../../src/verex";
import {anything} from "../../src/wildcards";
import "../custom-matchers";

test("passwords", () => {
  const validSpecialCharacters = "~`!@#$%^&*()-+={[}]|\\:;\"'<,>.?/".split("");
  const validCharacter = anyCharacterFrom([
    wordCharacter,
    ...validSpecialCharacters
  ]);

  const atLeastOneDigit = lookahead(anything, digit);
  const atLeastOneAlpha = lookahead(anything, anyCharacterFrom([["a", "z"]]));
  const atLeastOneSpecial = lookahead(anything, anyCharacterFrom(validSpecialCharacters));

  const password = VerEx(
    atLeastOneDigit,
    atLeastOneSpecial,
    atLeastOneAlpha,
    repeat(validCharacter, 12, Infinity)
  );

  expect(password).toMatchString("foobarbaz123!@#");

  expect(password).not.toMatchString("foo1!");
  expect(password).not.toMatchString("foobarbaz____");
  expect(password).not.toMatchString("foobarbaz1234");
  expect(password).not.toMatchString("1234567890!@#$%^&*()");
});
