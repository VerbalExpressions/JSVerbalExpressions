import Fragment from "./types/fragment";

const {raw} = String;

export const startOfLine = new Fragment("^");
export const endOfLine = new Fragment("$");

export const wordBoundary = new Fragment(raw`\b`);
export const nonWordBoundary = new Fragment(raw`\B`);
