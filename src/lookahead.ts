import concat from "./concat";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function lookahead(...expressions: Expression[]): RawExpression {
  const concatenated = concat(...expressions);

  return new RawExpression(`(?=${concatenated})`);
}

lookahead.positive = lookahead;

lookahead.negative = (...expressions: Expression[]): RawExpression => {
  const concatenated = concat(...expressions);

  return new RawExpression(`(?!${concatenated})`);
};

export default lookahead;
