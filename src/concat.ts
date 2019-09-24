import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function concat(...expressions: Expression[]): RawExpression {
  expressions = mixedToRawArray(expressions);

  return new RawExpression(
    group.nonCapturing(expressions.join(""))
  );
}

export default concat;
