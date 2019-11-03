import Fragment from "./types/fragment";

const raw = String.raw;

export const startOfLine = new Fragment("^");
export const endOfLine = new Fragment("$");

export const digit = new Fragment(raw`\d`);
export const nonDigit = new Fragment(raw`\D`);

export const wordCharacter = new Fragment(raw`\w`);
export const nonWordCharacter = new Fragment(raw`\W`);

export const whitespaceCharacter = new Fragment(raw`\s`);
export const nonWhitespaceCharacter = new Fragment(raw`\S`);

export const wordBoundary = new Fragment(raw`\b`);
export const nonWordBoundary = new Fragment(raw`\B`);

export const anyCharacter = new Fragment(".");

export const anything = new Fragment(".*");
export const something = new Fragment(".+");
