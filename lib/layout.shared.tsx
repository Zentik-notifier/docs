import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Github } from 'lucide-react';
import { DiscordIcon } from '@/components/NavbarIcons';

export const gitConfig = {
  user: 'Zentik-notifier',
  repo: 'zentik-notifier',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <img
          src="/logos/brand-logo.png"
          alt="Zentik Logo"
          className="h-8 w-auto"
        />
      ),
      url: '/',
    },
    links: [
      {
        type: 'main',
        url: '/docs',
        text: 'Docs',
        on: 'all',
      },
      {
        type: 'menu',
        text: 'Apps',
        on: 'all',
        items: [
          { type: 'main', url: 'https://apps.apple.com/de/app/zentik-notifier/id6749312723', text: 'App Store', external: true },
          { type: 'main', url: 'https://testflight.apple.com/join/dFqETQEm', text: 'TestFlight', external: true },
          { type: 'main', url: 'https://notifier.zentik.app', text: 'Web PWA', external: true },
        ],
      },
      {
        type: 'icon',
        url: 'https://discord.gg/DzhJ4s7N',
        label: 'Discord',
        icon: <DiscordIcon className="h-5 w-5" />,
        text: 'Discord',
        external: true,
        on: 'nav',
      },
      {
        type: 'icon',
        url: `https://github.com/${gitConfig.user}`,
        label: 'GitHub',
        icon: <Github className="h-5 w-5" />,
        text: 'GitHub',
        external: true,
        on: 'nav',
      },
      {
        type: 'icon',
        url: 'https://buymeacoffee.com/apocaliss92',
        label: 'Buy me a coffee',
        icon: <span className="text-base">☕</span>,
        text: 'Buy me a coffee',
        external: true,
        on: 'nav',
      },
    ],
  };
}
