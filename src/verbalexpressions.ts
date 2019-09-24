import Expression from "./types/expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function VerEx(...expressions: Expression[]): RegExp {
  expressions = mixedToRawArray(expressions);
  return new RegExp(expressions.join(""));
}

export default VerEx;
