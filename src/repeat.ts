import {group} from "./group";
import Expression from "./types/expression";
import Fragment from "./types/fragment";
import Natural, {isNatural} from "./types/natural";

type Inf = 9e999;

function repeat(
  expression: Expression,
  minTimes: Natural,
  maxTimes?: Natural | Inf
): Fragment {
  if (!isNatural(minTimes)) {
    throw new TypeError(`Invalid minimum: ${minTimes}: Must be a natural number`);
  }

  if (maxTimes !== undefined) {
    if (!isNatural(maxTimes) && maxTimes !== Infinity) {
      throw new TypeError(`Invalid maximum: ${maxTimes}: Must be a natural number or Infinity`);
    }

    if (minTimes > maxTimes) {
      throw new RangeError(`Invalid range: [${minTimes}, ${maxTimes}]: Maximum must be greater than or equal to minimum`);
    }
  }

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
  minTimes: Natural,
  maxTimes: Natural | Inf
): Fragment => {
  const greedy = repeat(expression, minTimes, maxTimes);
  return new Fragment(`${greedy}?`);
};

export {repeat};
