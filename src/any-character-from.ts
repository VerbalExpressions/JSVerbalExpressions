import Expression from "./types/expression";
import Fragment from "./types/fragment";

type CharacterOrRange = Expression | [Expression, Expression];

function anyCharacterFrom(charactersAndRanges: CharacterOrRange[]): Fragment {
  const rawCharacters = charactersAndRanges.map((expression) => {
    if (expression instanceof Array) {
      const rawRange = Fragment.arrayFromExpressions(expression);
      return new Fragment(rawRange.join("-"));
    } else {
      return new Fragment(expression);
    }
  });

  const raw = rawCharacters.join("");

  return new Fragment(`[${raw}]`);
}

export default anyCharacterFrom;
