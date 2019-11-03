import Expression from "./types/expression";
import Fragment from "./types/fragment";

function VerEx(...expressions: Expression[]): RegExp {
  expressions = Fragment.arrayFromExpressions(expressions);
  return new RegExp(expressions.join(""));
}

export default VerEx;
export const VerExp = VerEx;
