import simpleExp from "./util/simple-exp";

const oneOrMore = simpleExp(exp => `${exp}+`);
export default oneOrMore;
