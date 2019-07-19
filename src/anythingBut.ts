import { simpleExp } from "./utils";

const anythingBut = simpleExp<string>(exp => `[^${exp}]*`);
export default anythingBut;
