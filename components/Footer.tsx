import Link from 'next/link';
import { Github } from 'lucide-react';
import { DiscordIcon } from '@/components/NavbarIcons';

const LINKS = [
  {
    label: 'App Store',
    href: 'https://apps.apple.com/de/app/zentik-notifier/id6749312723',
  },
  {
    label: 'TestFlight',
    href: 'https://testflight.apple.com/join/dFqETQEm',
  },
  {
    label: 'Web PWA',
    href: 'https://notifier.zentik.app/',
  },
  {
    label: 'Request passthrough token',
    href: 'https://notifier.zentik.app/self-service/token-requests',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-fd-border bg-fd-muted/30 mt-auto">
      <div className="mx-auto max-w-[90rem] px-4 py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://discord.gg/DzhJ4s7N"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="Discord"
            >
              <DiscordIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/Zentik-notifier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://buymeacoffee.com/apocaliss92"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition-colors"
            >
                Buy a coffee
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zentik. Built with Fumadocs.
        </p>
      </div>
    </footer>
  );
}
