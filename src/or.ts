import {group} from "./group";
import Expression from "./types/expression";
import Fragment, {fragmentsFromExpressions} from "./types/fragment";

function or(...options: Expression[]): Fragment {
  options = fragmentsFromExpressions(options);
  const alternation = new Fragment(options.join("|"));

  return group.nonCapturing(alternation);
}

export {or};
