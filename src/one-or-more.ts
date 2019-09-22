import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function oneOrMore(exp: Expression): RawExpression {
  const raw = exprToRaw(exp);

  return new RawExpression(`(?:${raw})+`);
}

export default oneOrMore;
