import RawExpression from "./types/raw-expression";

const raw = String.raw;

export const startOfLine = new RawExpression("^");
export const endOfLine = new RawExpression("$");

export const digit = new RawExpression(raw`\d`);
export const nonDigit = new RawExpression(raw`\D`);

export const wordCharacter = new RawExpression(raw`\w`);
export const nonWordCharacter = new RawExpression(raw`\W`);

export const whitespaceCharacter = new RawExpression(raw`\s`);
export const nonWhitespaceCharacter = new RawExpression(raw`\S`);

export const wordBoundary = new RawExpression(raw`\b`);
export const nonWordBoundary = new RawExpression(raw`\B`);

export const anyCharacter = new RawExpression(".");

export const anything = new RawExpression(".*");
export const something = new RawExpression(".+");
