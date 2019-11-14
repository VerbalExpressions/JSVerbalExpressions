import {group} from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function oneOrMore(expression: Expression): Fragment {
  const raw = Fragment.fromExpression(expression);
  const grouped = group.nonCapturing(raw);

  return new Fragment(`${grouped}+`);
}

oneOrMore.greedy = oneOrMore;

oneOrMore.lazy = (expression: Expression): Fragment => {
  const greedy = oneOrMore(expression).toString();
  return new Fragment(`${greedy}?`);
};

export {oneOrMore};
