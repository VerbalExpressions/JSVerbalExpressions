import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function VerEx(...expressions: Expression[]): RegExp {
  expressions = RawExpression.arrayFromExpressions(expressions);
  return new RegExp(expressions.join(""));
}

export default VerEx;
export const VerExp = VerEx;
