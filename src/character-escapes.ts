import Fragment from "./types/fragment";

const {raw} = String;

export const digit = new Fragment(raw`\d`);
export const nonDigit = new Fragment(raw`\D`);

export const wordCharacter = new Fragment(raw`\w`);
export const nonWordCharacter = new Fragment(raw`\W`);

export const whitespaceCharacter = new Fragment(raw`\s`);
export const nonWhitespaceCharacter = new Fragment(raw`\S`);
