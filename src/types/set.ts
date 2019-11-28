import Expression from "./expression";
import Fragment from "./fragment";

type CharacterOrRange = Expression | [Expression, Expression];
type Set = CharacterOrRange[];

function setToString(set: Set): string {
  const rawCharacters = set.map(expression => {
    if (Array.isArray(expression)) {
      const rawRange = Fragment.arrayFromExpressions(expression);
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
