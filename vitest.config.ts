import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const SRC = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [{ find: /^@\//, replacement: `${SRC}/` }],
  },
  test: {
    environment: "node",
  },
});
