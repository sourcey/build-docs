import { defineConfig, openapi } from "sourcey";

export default defineConfig({
  name: "Sourcey action fixture",
  navigation: {
    tabs: [
      {
        tab: "API Reference",
        slug: "api",
        source: openapi("./openapi.yaml"),
      },
    ],
  },
});
