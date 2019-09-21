import Expression from "./types/expression";
import simplifyAndGroup from "./util/simplify-and-group";

export default function or(...inputs: Expression[]) {
  return new RegExp(inputs.map(simplifyAndGroup).join("|"));
}
