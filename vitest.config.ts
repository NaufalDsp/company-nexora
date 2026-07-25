import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    css: true,
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
