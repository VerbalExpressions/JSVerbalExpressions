import multiEntry from "rollup-plugin-multi-entry";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/*.ts",
  output: [
    {file: "dist/index.js", format: "esm"},
    {file: "dist/umd.js", name: "VerEx", format: "umd"}
  ],
  plugins: [
    multiEntry(),
    typescript()
  ]
};
