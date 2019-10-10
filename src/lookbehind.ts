import concat from "./concat";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function lookbehind(...expressions: Expression[]): RawExpression {
  const concatenated = concat(...expressions);

  return new RawExpression(`(?<=${concatenated})`);
}

lookbehind.positive = lookbehind;

lookbehind.negative = (...expressions: Expression[]): RawExpression => {
  const concatenated = concat(...expressions);

  return new RawExpression(`(?<!${concatenated})`);
};

export default lookbehind;
