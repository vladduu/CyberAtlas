import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CyberAtlas',
  tagline: '',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, 
  },

  url: 'https://cyberatlas.netlify.app',
  baseUrl: '/',

  organizationName: 'vladduu', 
  projectName: 'CyberAtlas', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: 'https://github.com/vladduu/CyberAtlas/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vladduu/CyberAtlas/tree/main/',
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
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CyberAtlas',

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'The Vault', 
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contributors',
          items: [
            {
              label: 'Damian Vlad-Stefan GitHub',
              href: 'https://github.com/vladduu',
            },
            {
              label: 'Popa Dragos-Catalin GitHub',
              href: 'https://github.com/DragozsP',
            },
          ],
        },
        {
          title: 'Project Info',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/vladduu/CyberAtlas',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CyberAtlas. Created by Damian Vlad-Stefan & Popa Dragos-Catalin. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'python', 'powershell', 'rust'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;