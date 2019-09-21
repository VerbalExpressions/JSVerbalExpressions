import simpleExp from "./util/simple-exp";

const anythingBut = simpleExp<string>(exp => `[^${exp}]*`);
export default anythingBut;
