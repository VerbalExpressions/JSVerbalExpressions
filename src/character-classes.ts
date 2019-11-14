import Expression from "./types/expression";
import Fragment from "./types/fragment";

type CharacterOrRange = Expression | [Expression, Expression];

function setToString(set: CharacterOrRange[]): string {
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

function anyCharacterFrom(charactersAndRanges: CharacterOrRange[]): Fragment {
  const setString = setToString(charactersAndRanges);
  return new Fragment(`[${setString}]`);
}

function anyCharacterBut(charactersAndRanges: CharacterOrRange[]): Fragment {
  const setString = setToString(charactersAndRanges);
  return new Fragment(`[^${setString}]`);
}

export {anyCharacterFrom, anyCharacterBut};
