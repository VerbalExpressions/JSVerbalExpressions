import group from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function or(...options: Expression[]): Fragment {
  options = Fragment.arrayFromExpressions(options);
  const alternation = new Fragment(options.join("|"));

  return group.nonCapturing(alternation);
}

export default or;
