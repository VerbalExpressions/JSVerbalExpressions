import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

type CharacterOrRange = Expression | [Expression, Expression];

function anyCharacterFrom(charactersAndRanges: CharacterOrRange[]): RawExpression {
  const rawCharacters = charactersAndRanges.map((expression) => {
    if (expression instanceof Array) {
      const rawRange = RawExpression.arrayFromExpressions(expression);
      return new RawExpression(rawRange.join("-"));
    } else {
      return new RawExpression(expression);
    }
  });

  const raw = rawCharacters.join("");

  return new RawExpression(`[${raw}]`);
}

export default anyCharacterFrom;
