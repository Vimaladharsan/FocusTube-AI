import type { ManifestV3Export } from "@crxjs/vite-plugin";

const manifest: ManifestV3Export = {
  manifest_version: 3,

  name: "FocusTube AI",

  version: "1.0.0",

  description:
    "A productivity-first Chrome extension that blocks ads, removes distractions, and enhances YouTube.",

  action: {
    default_popup: "index.html",
    default_title: "FocusTube AI",
  },
  
  permissions: ["storage", "declarativeNetRequest"],

  options_ui: {
    page: "src/options/dashboard.html",
    open_in_tab: true,
  },

  declarative_net_request: {
    rule_resources: [
      {
        id: "adblock_rules",
        enabled: true,
        path: "rules/adblock.json",
      },
    ],
  },

  background: {
    service_worker: "src/background/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["https://*.youtube.com/*"],
      js: ["src/content/interceptor.ts"],
      world: "MAIN",
      run_at: "document_start",
    },
    {
      matches: ["https://*.youtube.com/*"],
      js: ["src/content/content.ts"],
      run_at: "document_end",
    },
  ],
};
export default manifest;