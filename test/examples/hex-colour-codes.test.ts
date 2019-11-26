import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {or} from "../../src/or";
import {repeat} from "../../src/repeat";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

test("hex colour codes", () => {
  const hexCharacter = anyCharacterFrom([["a", "f"], [0, 9]]);

  const hexColour = VerEx(
    {ignoreCase: true},
    startOfLine,
    "#",
    or(
      repeat(hexCharacter, 6),
      repeat(hexCharacter, 3)
    ),
    endOfLine
  );

  expect(hexColour).toMatchString("#FFF");
  expect(hexColour).toMatchString("#bae");
  expect(hexColour).toMatchString("#8ce060");
  expect(hexColour).toMatchString("#E6E6FA");

  expect(hexColour).not.toMatchString("E6E6FA");
  expect(hexColour).not.toMatchString("#fb0_7d");
  expect(hexColour).not.toMatchString("#9134");
  expect(hexColour).not.toMatchString("#");
});
