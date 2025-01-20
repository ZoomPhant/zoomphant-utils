import json from "@rollup/plugin-json";
import resolver from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/monitor-sdk.js",
      format: "umd",
      name: "ZoomPhantMonitor",
    },
    plugins: [
      resolver(),
      json(),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: "src/index.debug.js",
    output: {
      file: "dist/monitor-sdk.debug.js",
      format: "umd",
      name: "ZoomPhantMonitor",
    },
    plugins: [resolver(), json()],
  },
];
