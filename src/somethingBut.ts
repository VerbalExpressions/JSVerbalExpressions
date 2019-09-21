import RawExpression from "./types/raw-expression";
import SanitizeWorthy from "./types/sanitize-worthy";
import exprToRaw from "./util/expr-to-raw";

function somethingBut(exp: SanitizeWorthy | RegExp | RawExpression): RawExpression {
  const raw = exprToRaw(exp);

  return new RawExpression(`[^${raw}]+`);
}

export default somethingBut;
