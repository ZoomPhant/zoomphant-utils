await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./files",
  minify: true,
  format: "esm",
  target: "browser",
  sourcemap: "external",
  naming: '[dir]/[name].[ext]'
});
