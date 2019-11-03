import concat from "./concat";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function lookbehind(...expressions: Expression[]): Fragment {
  const concatenated = concat(...expressions);

  return new Fragment(`(?<=${concatenated})`);
}

lookbehind.positive = lookbehind;

lookbehind.negative = (...expressions: Expression[]): Fragment => {
  const concatenated = concat(...expressions);

  return new Fragment(`(?<!${concatenated})`);
};

export default lookbehind;
