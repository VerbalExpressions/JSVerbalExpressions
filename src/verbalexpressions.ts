import SanitizeWorthy from "./types/sanitize-worthy";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function VerEx(...args: (SanitizeWorthy | RegExp | RawExpression)[]): RegExp {
  args = mixedToRawArray(args);
  return new RegExp(args.join(''));
}

export default VerEx;
