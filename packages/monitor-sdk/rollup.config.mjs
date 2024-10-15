import json from "@rollup/plugin-json";
import resolver from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: "src/index.js",
  output: {
    file: "dist/monitor-sdk.js",
    format: "umd",
    name: "ZoomPhantMonitor",
  },
  plugins: [
    resolver(),
    json(),
    terser()
  ],

};
