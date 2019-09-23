import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function concat(...args: Expression[]): RawExpression {
  args = mixedToRawArray(args);
  return new RawExpression(
    group.nonCapturing(args.join(""))
  );
}

export default concat;
