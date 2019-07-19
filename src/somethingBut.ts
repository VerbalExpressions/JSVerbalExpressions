import { simpleExp } from "./utils";

const somethingBut = simpleExp(exp => `[^${exp}]+`);
export default somethingBut;
