import Expression from "./types/expression";
import Fragment from "./types/fragment";

type CharacterOrRange = Expression | [Expression, Expression];

function anyCharacterBut(charactersAndRanges: CharacterOrRange[]): Fragment {
  const rawCharacters = charactersAndRanges.map(expression => {
    if (Array.isArray(expression)) {
      const rawRange = Fragment.arrayFromExpressions(expression);
      return new Fragment(rawRange.join("-"));
    }

    return new Fragment(expression);
  });

  const raw = rawCharacters.join("");

  return new Fragment(`[^${raw}]`);
}

export default anyCharacterBut;
