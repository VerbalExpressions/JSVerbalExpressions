import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function anyCharacterFrom(characters: Expression[] | Expression): RawExpression {
  if (characters instanceof Array) {
    characters = characters.join("");
  }

  const raw = exprToRaw(characters);

  return new RawExpression(`[${raw}]`);
}

export default anyCharacterFrom;
