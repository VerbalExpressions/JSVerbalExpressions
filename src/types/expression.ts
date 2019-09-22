import RawExpression from "./raw-expression";
import SanitizeWorthy from "./sanitize-worthy";

type Expression = SanitizeWorthy | RegExp | RawExpression;

export default Expression;
