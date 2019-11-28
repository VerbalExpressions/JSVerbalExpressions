import {group} from "./group";
import Expression from "./types/expression";
import Fragment, {fragmentsFromExpressions} from "./types/fragment";

function concat(...expressions: Expression[]): Fragment {
  expressions = fragmentsFromExpressions(expressions);
  const concatenated = new Fragment(expressions.join(""));

  return group.nonCapturing(concatenated);
}

export {concat};
