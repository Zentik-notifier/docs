import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { ScalarOptions } from '@scalar/docusaurus';
import { themes as prismThemes } from 'prism-react-renderer';

import 'dotenv/config';

const backendApi = process.env.BACKEND_API ?? 'https://notifier-api.zentik.app/api/openapi.json';

const config: Config = {
  title: 'Zentik',
  tagline: 'Advanced notification system for your mobile app',
  favicon: '/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.zentik.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zentik', // Usually your GitHub org/user name.
  projectName: 'zentik-notifier', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apocaliss92/zentik',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: 'Zentik',
      logo: {
        alt: 'Zentik Logo',
        src: 'logos/zentik_logo_FINAL_square_aqua_whiteZ_1024_80.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/apocaliss92/zentik',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Documentation',
      //     items: [
      //       {
      //         label: 'Introduction',
      //         to: '/docs/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/apocaliss92/zentik',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Other',
      //     items: [
      //       {
      //         label: 'Mobile App',
      //         href: 'https://zentik.app',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Zentik. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@scalar/docusaurus',
      {
        label: 'API',
        route: '/scalar',
        showNavLink: true, // optional, default is true
        configuration: {
          // url: 'http://192.168.1.193:3000/api/openapi.json',
          // url: 'https://notifier-api.zentik.app/api/openapi.json',
          url: backendApi,
        },
      } as ScalarOptions,
    ],
  ],
};

export default config;
