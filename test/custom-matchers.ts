/* eslint-disable array-element-newline */

import chalk from "chalk";
import format from "pretty-format";

const {bold, red, green, grey} = chalk;

expect.extend({
  toMatchString(regex, str) {
    const doesMatch = regex.test(str);
    const exec = regex.exec(str);

    const options = {highlight: true, indent: 4};

    let line;
    let message;

    if (doesMatch) {
      line = [
        grey("expect"),
        grey("("), red("regex"), grey(")"),
        grey("."), "not",
        grey("."), "toMatchString",
        grey("("), green("string"), grey(")"),
        " ", grey("// regex.test(string)")
      ];

      message = `
${line.join("")}

Expected ${bold(regex)} to ${bold("not")} match ${bold(`"${str}"`)}

${grey("regex.exec(string)")}

${format(exec, options)}
      `;

      return {pass: true, message: () => message.trim()};
    }

    line = [
      grey("expect"),
      grey("("), red("regex"), grey(")"),
      grey("."), "toMatchString",
      grey("("), green("string"), grey(")"),
      " ", grey("// regex.test(string)")
    ];

    message = `
${line.join("")}

Expected ${bold(regex)} to match ${bold(`"${str}"`)}

${grey("regex.exec(string)")}

${format(exec, options)}
    `;

    return {pass: false, message: () => message.trim()};
  }
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchString(str: string): boolean;
    }

    interface Expect {
      toMatchString(str: string): boolean;
    }
  }
}

export default expect;
