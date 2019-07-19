type Expression = RegExp | string;

function simplifyExpression(expression: Expression): string {
  if (expression instanceof RegExp) {
    return expression.source;
  }
  return expression;
}

function VerEx(...args: Expression[]): RegExp {
  return new RegExp(compile(...args));
}

export function compile(...args: Expression[]): string {
  return args.map(simplifyExpression).join("");
}

export default VerEx;
