import simplifyAndGroup from "./simplify-and-group";
import Expression from "../types/expression";

export default function simpleExp<ExpType extends Expression = Expression>(
  callback: (exp: string) => string
) {
  return (input: ExpType) => new RegExp(callback(simplifyAndGroup(input)));
}
