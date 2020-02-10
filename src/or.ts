import {group} from "./group";
import Expression from "./types/expression";
import Fragment, {fragmentsFromExpressions, joinFragments} from "./types/fragment";

function or(...options: Expression[]): Fragment {
  const fragments = fragmentsFromExpressions(options);
  const alternation = joinFragments(fragments, "|");

  return group.nonCapturing(alternation);
}

export {or};
