import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

type CharacterOrRange = Expression | [Expression, Expression];

function anyCharacterFrom(characters: CharacterOrRange[]): RawExpression {
  for (const [i, expression] of Object.entries(characters)) {
    if (expression instanceof Array) {
      characters[i] = expression.join("-");
    }
  }

  const setAsString = characters.join("");
  const raw = exprToRaw(setAsString);

  return new RawExpression(`[${raw}]`);
}

export default anyCharacterFrom;
