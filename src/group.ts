import Expression from "./types/expression";
import { compile } from "./verbalexpressions";

export default function group(...inputs: Expression[]) {
  return new RegExp(`(${compile(...inputs)})`);
}
