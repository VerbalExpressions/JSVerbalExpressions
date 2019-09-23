import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function anyCharacterBut(exp: Expression[] | Expression): RawExpression {
  if (exp instanceof Array) {
    exp = exp.join("");
  }

  const raw = exprToRaw(exp);

  return new RawExpression(`[^${raw}]`);
}

export default anyCharacterBut;
