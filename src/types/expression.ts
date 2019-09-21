import SanitizeWorthy from "./sanitize-worthy";
import RawExpression from "./raw-expression";

type Expression = SanitizeWorthy | RegExp | RawExpression;

export default Expression;
