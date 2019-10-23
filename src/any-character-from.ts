import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

type CharacterOrRange = Expression | [Expression, Expression];

function anyCharacterFrom(characters: CharacterOrRange[]): RawExpression {
  const rawCharacters = characters.map((expression) => {
    if (expression instanceof Array) {
      const rawRange = mixedToRawArray(expression);
      return new RawExpression(rawRange.join("-"));
    } else {
      return new RawExpression(expression);
    }
  });

  const raw = rawCharacters.join("");

  return new RawExpression(`[${raw}]`);
}

export default anyCharacterFrom;
