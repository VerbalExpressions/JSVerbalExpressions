import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function oneOrMore(expression: Expression): RawExpression {
  const raw = exprToRaw(expression);
  const grouped = group.nonCapturing(raw);

  return new RawExpression(`${grouped}+`);
}

oneOrMore.greedy = oneOrMore;

oneOrMore.lazy = (expression: Expression): RawExpression => {
  const greedy = oneOrMore(expression).toString();
  return new RawExpression(`${greedy}?`);
};

export default oneOrMore;
