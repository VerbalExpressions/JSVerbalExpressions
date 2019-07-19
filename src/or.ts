import { Expression } from "./types";
import { simplifyAndGroup } from "./utils";

export default function or(...inputs: Expression[]) {
  return inputs.map(simplifyAndGroup).join("|");
}
