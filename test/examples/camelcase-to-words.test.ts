import {anyCharacterFrom} from "../../src/character-classes";
import {lookahead} from "../../src/lookaround";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

test("camelcase to words", () => {
  const capital = VerEx(
    lookahead(anyCharacterFrom([["A", "Z"]]))
  );

  expect("camelCaseFtw".split(capital)).toEqual(["camel", "Case", "Ftw"]);
  expect("wordWord927".split(capital)).toEqual(["word", "Word927"]);
});
