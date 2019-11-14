import {group} from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function concat(...expressions: Expression[]): Fragment {
  expressions = Fragment.arrayFromExpressions(expressions);
  const concatenated = new Fragment(expressions.join(""));

  return group.nonCapturing(concatenated);
}

export {concat};
