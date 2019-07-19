import { simpleExp } from "./utils";

const somethingBut = simpleExp<string>(exp => `[^${exp}]+`);
export default somethingBut;
