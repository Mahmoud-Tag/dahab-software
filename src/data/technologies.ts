export interface TechnologyItem {
  name: string;
  description: string;
  iconUrl?: string;
}

export const technologies: TechnologyItem[] = [
  {
    name: 'Next.js',
    description: 'React framework with server‑side rendering, static generation, and API routes.',
    iconUrl: '/icons/nextjs.svg',
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime for building scalable backend services.',
    iconUrl: '/icons/nodejs.svg',
  },
  {
    name: 'PostgreSQL',
    description: 'Powerful open‑source relational database.',
    iconUrl: '/icons/postgresql.svg',
  },
  {
    name: 'TailwindCSS',
    description: 'Utility‑first CSS framework for rapid UI development.',
    iconUrl: '/icons/tailwindcss.svg',
  },
];
