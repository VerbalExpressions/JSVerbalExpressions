import concat from "./concat";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function lookahead(...expressions: Expression[]): Fragment {
  const concatenated = concat(...expressions);

  return new Fragment(`(?=${concatenated})`);
}

lookahead.positive = lookahead;

lookahead.negative = (...expressions: Expression[]): Fragment => {
  const concatenated = concat(...expressions);

  return new Fragment(`(?!${concatenated})`);
};

export default lookahead;
