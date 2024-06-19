import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./files",
  minify: true,
  format: "esm",
  target: "browser",
  sourcemap: "external",
  plugins: [dts()],
  external: ["react", "react-dom"],
});
