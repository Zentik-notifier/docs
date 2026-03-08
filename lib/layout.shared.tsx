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
    ],
  };
}
