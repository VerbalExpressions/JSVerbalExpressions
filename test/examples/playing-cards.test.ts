import {endOfLine, startOfLine} from "../../src/anchors";
import {anyCharacterFrom} from "../../src/character-classes";
import {lookahead} from "../../src/lookaround";
import {or} from "../../src/or";
import {VerEx} from "../../src/verex";
import "../custom-matchers";

test("playing cards", () => {
  const spades = anyCharacterFrom([["🂡", "🂮"]]);
  const hearts = anyCharacterFrom([["🂱", "🂾"]]);
  const diamonds = anyCharacterFrom([["🃁", "🃎"]]);
  const clubs = anyCharacterFrom([["🃑", "🃞"]]);

  const knights = anyCharacterFrom(["🂬", "🂼", "🃌", "🃜"]);

  const playingCard = VerEx(
    {unicode: true},
    startOfLine,
    lookahead.negative(knights),
    or(spades, hearts, diamonds, clubs),
    endOfLine
  );

  expect(playingCard).toMatchString("🃁");
  expect(playingCard).toMatchString("🂭");
  expect(playingCard).toMatchString("🂳");
  expect(playingCard).toMatchString("🂫");
  expect(playingCard).toMatchString("🃔");

  expect(playingCard).not.toMatchString("🂬");
  expect(playingCard).not.toMatchString("🃟");
  expect(playingCard).not.toMatchString("🂠");
});
