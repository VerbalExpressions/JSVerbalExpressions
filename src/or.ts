import { Expression } from "./types";
import { simplifyExpression } from "./utils";

export default function or(...inputs: Expression[]) {
  return inputs
    .map(simplifyExpression)
    .map(expression => `(?:${expression})`)
    .join("|");
}
