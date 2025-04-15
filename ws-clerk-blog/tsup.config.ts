import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./bin/server.ts", "./src/app"],
  clean: true,
  format: "esm",
  outDir: "./dist",
});
