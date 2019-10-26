import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function oneOrMore(expression: Expression): RawExpression {
  const raw = RawExpression.fromExpression(expression);
  const grouped = group.nonCapturing(raw);

  return new RawExpression(`${grouped}+`);
}

oneOrMore.greedy = oneOrMore;

oneOrMore.lazy = (expression: Expression): RawExpression => {
  const greedy = oneOrMore(expression).toString();
  return new RawExpression(`${greedy}?`);
};

export default oneOrMore;
