import type { Config } from "@react-router/dev/config";

import { portfolioFixture } from "./src/data/mock/fixtures/portfolio";

export default {
  appDirectory: "src",
  buildDirectory: "build",
  prerender() {
    return [
      "/",
      "/portfolio",
      ...portfolioFixture.projects.map(
        (project) => `/portfolio/${project.slug}`,
      ),
    ];
  },
  ssr: true,
} satisfies Config;
