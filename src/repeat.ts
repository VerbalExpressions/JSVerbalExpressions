import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function repeat(
  expression: Expression,
  minTimes: number,
  maxTimes?: number
): RawExpression {
  const grouped = group.nonCapturing(expression);

  let output: string;

  if (maxTimes === undefined) {
    output = `${grouped}{${minTimes}}`;
  } else if (maxTimes === Infinity) {
    output = `${grouped}{${minTimes},}`;
  } else {
    output = `${grouped}{${minTimes},${maxTimes}}`;
  }

  return new RawExpression(output);
}

repeat.greedy = repeat;

repeat.lazy = (
  expression: Expression,
  minTimes: number,
  maxTimes: number
): RawExpression => {
  const greedy = repeat(expression, minTimes, maxTimes);
  return new RawExpression(`${greedy}?`);
};

export default repeat;
