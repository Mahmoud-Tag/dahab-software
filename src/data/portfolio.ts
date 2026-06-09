export interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
}

export const projects: ProjectItem[] = [
  {
    title: 'منصة تجارة إلكترونية للشركات',
    slug: 'ecommerce-platform',
    description: 'حل تجارة إلكترونية متكامل يدعم المبيعات العالمية، مع بوابات دفع متعددة وإدارة مخزون ذكية.',
    category: 'eCommerce',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'تطبيق موبايل للتمريض الذكي',
    slug: 'smart-nurse-app',
    description: 'تطبيق React Native لتتبع المرضى وإدارة المهام للطاقم الطبي.',
    category: 'Mobile Development',
    technologies: ['React Native', 'Expo', 'Firebase'],
  },
  {
    title: 'نظام إدارة علاقات العملاء CRM',
    slug: 'custom-crm',
    description: 'نظام CRM مخصص يدعم تتبع المبيعات، العملاء، وإدارة الحملات التسويقية.',
    category: 'Custom Software',
    technologies: ['NestJS', 'MongoDB', 'TailwindCSS'],
  },
];
