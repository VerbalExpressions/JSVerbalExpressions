import RawExpression from "./types/raw-expression";

export const startOfLine = new RawExpression('^');
export const endOfLine = new RawExpression('$');
export const anything = new RawExpression('.*');
export const something = new RawExpression('.+');
