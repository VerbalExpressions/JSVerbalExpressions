import Fragment from "./fragment";
import SanitizeWorthy from "./sanitize-worthy";

/**
 * A union type of the types that most VerbalExpression methods can work with.
 */
type Expression = SanitizeWorthy | RegExp | Fragment;

export default Expression;
