/* eslint-disable @typescript-eslint/camelcase */

import multiEntry from "rollup-plugin-multi-entry";
import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";

export default [
  {
    input: "src/*.ts",
    output: [
      {file: "dist/index.mjs", format: "esm"},
      {file: "dist/umd.js", name: "ve", format: "umd"}
    ],
    plugins: [
      multiEntry(),
      typescript(),
      terser({
        include: [/^.+\.m?js$/],
        output: {beautify: true, comments: /[^\w\W]/, indent_level: 2}
      })
    ]
  },
  {
    input: "src/*.ts",
    output: [
      {file: "dist/index.min.mjs", format: "esm"},
      {file: "dist/umd.min.js", name: "ve", format: "umd"}
    ],
    plugins: [
      multiEntry(),
      typescript(),
      terser({
        include: [/^.+\.min\.m?js$/],
        output: {comments: /[^\w\W]/, indent_level: 2}
      })
    ]
  }
];
