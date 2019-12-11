import Expression from "./expression";
import Fragment, {fragmentsFromExpressions, joinFragments} from "./fragment";

type CharacterOrRange = Expression | [Expression, Expression];
type Set = CharacterOrRange[];

function setToFragment(set: Set): Fragment {
  const rawCharacters = set.map(expression => {
    if (Array.isArray(expression)) {
      const range = fragmentsFromExpressions(expression);
      return joinFragments(range, "-");
    }

    return Fragment.fromExpression(expression);
  });

  return joinFragments(rawCharacters);
}

export default Set;
export {CharacterOrRange, setToFragment};
