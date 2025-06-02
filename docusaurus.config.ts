import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

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
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "builders",
        path: "builders-docs",
        routeBasePath: "builders",
        sidebarPath: require.resolve("./sidebar/sidebars-builders.ts"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "resources",
        path: "resources-docs",
        routeBasePath: "resources",
        sidebarPath: require.resolve("./sidebar/sidebars-resources.ts"),
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
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
          label: "Introduction",
        },
        {
          to: "/educ/intro",
          label: "Education",
          position: "left",
        },
        {
        to: '/builders/intro',
        label: 'Builders',
        position: 'left',
      },
      {
        to: '/resources/intro',
        label: 'Resources',
        position: 'left',
      },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              label: "Help us translate",
              href: "https://github.com/BLOKCapital/documentation/issues", // Replace with your translation platform link
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Telegram",
              href: "https://t.me/BLOKCapital",
            },
            {
              label: "X (Twitter)",
              href: "https://x.com/blok_cap",
            },
            {
              label: "Farcaster",
              href: "https://warpcast.com/blokc",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Website",
              href: "https://blokcapital.io/",
            },
            {
              label: "GitHub",
              href: "https://github.com/BLOKCapital",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BLOK Capital DAO LLC. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
