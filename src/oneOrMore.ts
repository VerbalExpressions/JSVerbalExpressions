import { simpleExp } from "./utils";

const oneOrMore = simpleExp(exp => `${exp}+`);
export default oneOrMore;
