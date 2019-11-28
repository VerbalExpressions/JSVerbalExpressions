import Expression from "./expression";
import {fragmentsFromExpressions} from "./fragment";

type CharacterOrRange = Expression | [Expression, Expression];
type Set = CharacterOrRange[];

function setToString(set: Set): string {
  const rawCharacters = set.map(expression => {
    if (Array.isArray(expression)) {
      const rawRange = fragmentsFromExpressions(expression);
      return rawRange.join("-");
    }

    return expression;
  });

  const raw = rawCharacters.join("");
  return raw;
}

export default Set;
export {
  CharacterOrRange,
  setToString
};
