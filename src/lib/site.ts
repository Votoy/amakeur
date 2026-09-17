export const SITE = {
  name: 'AMAKEUR｜野造',
  shortName: 'AMAKEUR',
  domain: 'amakeur.com',
  url: 'https://amakeur.com',
  description:
    'Independent digital studio. Amateur at code. Serious about making. Software, games, websites, tools, and experiments — shipped with NL, AI, aesthetics, and curiosity.',
  tagline: "I don't code. I make.",
  secondary: 'Amateur at code. Serious about making.',
  locale: 'en',
  author: {
    name: 'AMAKEUR｜野造',
    url: 'https://amakeur.com/about',
  },
  nav: [
    { href: '/apps', label: 'Apps' },
    { href: '/games', label: 'Games' },
    { href: '/web', label: 'Web' },
    { href: '/labs', label: 'Labs' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
} as const;

export type ProjectCategory = 'apps' | 'games' | 'web' | 'labs';
export type ProjectStatus = 'shipping' | 'experiment' | 'archived' | 'concept';

export const CATEGORY_META: Record<
  ProjectCategory,
  { title: string; subtitle: string; description: string }
> = {
  apps: {
    title: 'Apps',
    subtitle: 'Software that stays out of the way',
    description:
      'Small tools and private utilities — built to feel inevitable, not impressive.',
  },
  games: {
    title: 'Games',
    subtitle: 'Playable sketches of ordinary life',
    description:
      'Workplace towers, office shooters, coffee rituals — games about the hours between meetings.',
  },
  web: {
    title: 'Web',
    subtitle: 'Sites that behave like objects',
    description:
      'Interactive and experimental sites — pages as instruments, not brochures.',
  },
  labs: {
    title: 'Labs',
    subtitle: 'Vibecoding without a category',
    description:
      'Uncategorizable experiments. Half finished on purpose. Fully curious.',
  },
};
