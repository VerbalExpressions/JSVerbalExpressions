import Fragment from "./fragment";
import SanitizeWorthy from "./sanitize-worthy";

type Expression = SanitizeWorthy | RegExp | Fragment;

export default Expression;
