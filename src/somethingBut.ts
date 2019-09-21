import simpleExp from "./util/simple-exp";

const somethingBut = simpleExp<string>(exp => `[^${exp}]+`);
export default somethingBut;
