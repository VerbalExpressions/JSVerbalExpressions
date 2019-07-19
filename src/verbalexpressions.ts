import { Expression } from "./types";
import { simplifyExpression } from "./utils";

function VerEx(...args: Expression[]): RegExp {
  return new RegExp(compile(...args));
}

export function compile(...args: Expression[]): string {
  return args.map(simplifyExpression).join("");
}

export default VerEx;
