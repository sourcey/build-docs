import { defineConfig, markdown } from "sourcey";

export default defineConfig({
  name: "Build Docs Test",
  siteUrl: "https://example.com",
  navigation: {
    tabs: [
      {
        tab: "Docs",
        slug: "",
        source: markdown({ groups: [{ group: "Start", pages: ["index"] }] }),
      },
    ],
  },
});
