import RawExpression from "./types/raw-expression";

const raw = String.raw;

export const startOfLine = new RawExpression("^");
export const endOfLine = new RawExpression("$");

export const digit = new RawExpression(raw`\d`);
export const wordCharacter = new RawExpression(raw`\w`);
export const whitespaceCharacter = new RawExpression(raw`\s`);
export const wordBoundary = new RawExpression(raw`\b`);
export const anyCharacter = new RawExpression(".");

export const anything = new RawExpression(".*");
export const something = new RawExpression(".+");
