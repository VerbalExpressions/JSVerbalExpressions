/* eslint-disable @typescript-eslint/camelcase */

import multiEntry from "rollup-plugin-multi-entry";
import typescript from "@wessberg/rollup-plugin-ts";
import {terser} from "rollup-plugin-terser";

const noDeclaration = {tsconfig: {declaration: false}};
const clean = {comments: /[^\w\W]/};
const beautifyAndClean = {
  beautify: true,
  indent_level: 2,
  ...clean
};

const builds = [
  {
    input: "src/*.ts",
    output: {file: "dist/index.mjs", format: "esm"},
    plugins: [
      multiEntry(),
      typescript(),
      terser({
        include: [/^.+\.m?js$/],
        output: beautifyAndClean
      })
    ]
  },
  {
    input: "src/*.ts",
    output: {file: "dist/umd.js", name: "ve", format: "umd"},
    plugins: [
      multiEntry(),
      typescript(noDeclaration),
      terser({
        include: [/^.+\.m?js$/],
        output: beautifyAndClean
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
      typescript(noDeclaration),
      terser({
        include: [/^.+\.min\.m?js$/],
        output: clean
      })
    ]
  }
];

export default builds;
