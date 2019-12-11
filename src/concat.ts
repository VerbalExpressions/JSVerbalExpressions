import {group} from "./group";
import Expression from "./types/expression";
import Fragment, {fragmentsFromExpressions, joinFragments} from "./types/fragment";

function concat(...expressions: Expression[]): Fragment {
  const fragments = fragmentsFromExpressions(expressions);
  const concatenated = joinFragments(fragments);

  return group.nonCapturing(concatenated);
}

export {concat};
