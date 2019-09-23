import Expression from "./types/expression";
import group from "./group";
import mixedToRawArray from "./util/mixed-to-raw-array";
import RawExpression from "./types/raw-expression";

function concat(...args: Expression[]): RawExpression {
  args = mixedToRawArray(args);
  return new RawExpression(
    group.nonCapturing(args.join(''))
  );
}

export default concat;
