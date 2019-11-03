import group from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function multiple(expression: Expression): Fragment {
  const grouped = group.nonCapturing(expression);

  return new Fragment(`${grouped}*`);
}

multiple.greedy = multiple;

multiple.lazy = (expression: Expression): Fragment => {
  const greedy = multiple(expression).toString();
  return new Fragment(`${greedy}?`);
};

export default multiple;
export const zeroOrMore = multiple;
