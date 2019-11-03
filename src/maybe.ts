import group from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function maybe(expression: Expression): Fragment {
  const raw = Fragment.fromExpression(expression);
  const grouped = group.nonCapturing(raw);

  return new Fragment(`${grouped}?`);
}

maybe.greedy = maybe;

maybe.lazy = (expression: Expression): Fragment => {
  const greedy = maybe(expression);
  return new Fragment(`${greedy}?`);
};

export default maybe;
export const optionally = maybe;
