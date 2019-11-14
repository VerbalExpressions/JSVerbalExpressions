import {group} from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";

function repeat(
  expression: Expression,
  minTimes: number,
  maxTimes?: number
): Fragment {
  const grouped = group.nonCapturing(expression);

  let output: string;

  if (maxTimes === undefined) {
    output = `${grouped}{${minTimes}}`;
  } else if (maxTimes === Infinity) {
    output = `${grouped}{${minTimes},}`;
  } else {
    output = `${grouped}{${minTimes},${maxTimes}}`;
  }

  return new Fragment(output);
}

repeat.greedy = repeat;

repeat.lazy = (
  expression: Expression,
  minTimes: number,
  maxTimes: number
): Fragment => {
  const greedy = repeat(expression, minTimes, maxTimes);
  return new Fragment(`${greedy}?`);
};

export {repeat};
