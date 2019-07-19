import { simpleExp } from "./utils";

const anythingBut = simpleExp(exp => `[^${exp}]*`);
export default anythingBut;
