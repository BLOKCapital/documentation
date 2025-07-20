import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import translations from "./src/data/translations.json";

// Helper to get translation object for current locale
function getT(locale: string) {
  return translations[locale];
}

const config: Config = {
  title: "BLOK Capital",
  tagline: "BLOK Capital",
  favicon: "img/blokclogo.svg",

  url: "https://blokcapital.pages.dev",
  baseUrl: "/",

  organizationName: "BLOKCapital",
  projectName: "documentation",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"], // Add 'fr' here
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebar/sidebars.ts"),
          routeBasePath: "/",
          editUrl: "https://github.com/BLOKCapital/documentation/issues",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-lunr-search", // if you're using it
      {},
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "educ",
        path: "educ-docs",
        routeBasePath: "educ",
        sidebarPath: require.resolve("./sidebar/sidebars-educ.ts"),
        editUrl: "https://github.com/BLOKCapital/documentation/issues",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "builders",
        path: "builders-docs",
        routeBasePath: "builders",
        sidebarPath: require.resolve("./sidebar/sidebars-builders.ts"),
        editUrl: "https://github.com/BLOKCapital/documentation/issues",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "resources",
        path: "resources-docs",
        routeBasePath: "resources",
        sidebarPath: require.resolve("./sidebar/sidebars-resources.ts"),
        editUrl: "https://github.com/BLOKCapital/documentation/issues",
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: (function () {
      // Docusaurus only supports static config, so we use the default locale for build-time
      const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || "en";
      const t = getT(locale).navbar;
      return {
        title: "BLOK Capital",
        logo: {
          alt: "BLOK Capital Logo",
          src: "img/blokclogo.svg",
          href: "/",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: t.introduction,
          },
          {
            to: "/educ/intro",
            label: t.concepts,
            position: "left",
          },
          {
            to: "/builders/intro",
            label: t.builders,
            position: "left",
          },
          {
            to: "/resources/intro",
            label: t.resources,
            position: "left",
          },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                label: t.helpTranslate,
                href: "https://github.com/BLOKCapital/documentation/issues",
              },
            ],
          },
          {
            label: t.whitepaper,
            position: "right",
            href: "https://docsend.com/view/qqzdvsv2q47g6t9y",
          },
        ],
      };
    })(),
    footer: (function () {
      const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || "en";
      const t = getT(locale).footer;
      return {
        style: "dark",
        links: [
          {
            title: t.community,
            items: [
              {
                label: t.telegram,
                href: "https://t.me/BLOKCapital",
              },
              {
                label: t.twitter,
                href: "https://x.com/blok_cap",
              },
              {
                label: t.farcaster,
                href: "https://warpcast.com/blokc",
              },
            ],
          },
          {
            title: t.more,
            items: [
              {
                label: t.website,
                href: "https://blokcapital.io/",
              },
              {
                label: t.github,
                href: "https://github.com/BLOKCapital",
              },
            ],
          },
        ],
        copyright: t.copyright.replace("{year}", `${new Date().getFullYear()}`),
      };
    })(),
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
