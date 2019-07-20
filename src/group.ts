import { Expression } from "./types";
import { compile } from "./verbalexpressions";

export default function group(...inputs: Expression[]) {
  return new RegExp(`(${compile(...inputs)})`);
}
