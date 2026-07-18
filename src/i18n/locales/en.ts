import type { Translation } from '@/i18n/types';

export const en: Translation = {
  meta: {
    description: 'Felipe Vasconcelos — Senior Software Engineer & Frontend Chapter Lead at adidas. Building micro-frontend platforms, AI-powered developer tools, and cloud-native systems.',
    ogTitle: 'Felipe Vasconcelos — Senior Software Engineer',
    ogDescription: 'Frontend Chapter Lead at adidas. Building micro-frontend platforms, AI-powered developer tools, and cloud-native systems.',
    twitterTitle: 'Felipe Vasconcelos — Senior Software Engineer',
    twitterDescription: 'Frontend Chapter Lead at adidas. Building micro-frontend platforms, AI-powered developer tools, and cloud-native systems.',
  },
  skipToContent: 'Skip to content',
  hero: {
    role: 'Senior Software Engineer',
    tagline: 'Frontend Chapter Lead at adidas. Building micro-frontend platforms, AI-powered developer tools, and cloud-native systems.',
    quote: 'From the drums of Recife to the DOM — same rhythm, different stage.',
    location: 'Zaragoza, Spain',
    origin: 'Originally from Recife, Brazil',
  },
  about: {
    title: 'About',
    paragraphs: [
      'Senior Software Engineer with 15+ years building full-stack products across mobile, web, and cloud. I lead a team of 3 engineers, co-lead the Frontend Chapter, and own the architecture of a micro-frontend platform used across multiple product teams. I build custom AI integrations using MCP tooling that connects engineering systems and accelerates delivery.',
      'Born in Recife, Brazil, I bring that same energy to engineering: consistent, persistent, and always aligned with the team.',
    ],
  },
  experience: {
    title: 'Experience',
    roles: [
      {
        company: 'adidas',
        title: 'Senior Software Engineer · Frontend Chapter Lead',
        period: 'Jun 2019 to Present',
        location: 'Zaragoza, Spain',
        sections: [
          {
            heading: 'Leadership',
            items: [
              'Manage 3 direct reports through regular 1:1s, performance reviews, and career planning',
              'Co-lead the Frontend Chapter as 1 of 3 technical leads, setting architecture standards across the micro-frontend platform',
            ],
          },
          {
            heading: 'AI Integration & Tooling',
            items: [
              'Built a custom MCP toolchain integrating Instana, Bitbucket, Jira, Confluence, and GitHub to enable AI-assisted engineering workflows',
              'Ran a one-month AI-accelerated delivery experiment combining GitHub Copilot, Figma AI, and custom MCP tooling',
              'Building an MCP server that indexes multiple repositories into a single queryable knowledge base for AI agents across the department',
            ],
          },
          {
            heading: 'Platform Engineering',
            items: [
              'Led legacy system rewrite delivered in 2 months against a 1-year estimate, integrating AI tooling across all engineering disciplines',
              'Designed AWS real-time notification system (CDK, Lambda, DynamoDB, API Gateway) serving ~3,000 concurrent users',
              'Migrated micro-frontend shell from Webpack to Vite; rewrote Jenkins shared-library pipelines in Groovy for cross-team reuse',
              'Led Jest → Vitest migration — achieved 40%+ faster CI execution, benchmarked with Hyperfine across multiple environments',
            ],
          },
        ],
      },
      {
        company: 'Stellar Fusion',
        title: 'Full-Stack Engineer (Contract)',
        period: 'Jun 2021 to Jul 2022',
        location: 'Remote',
        highlights: ['Led full-stack development as team lead (React + Node.js)', 'Built an Excel-inspired formula evaluation engine running isomorphically in browser and backend'],
      },
      {
        company: 'CESAR · Samsung · Motorola',
        title: 'Software Engineer → Technical Lead',
        period: 'Dec 2010 to May 2019',
        location: 'Recife, Brazil',
        highlights: [
          'Built 20+ Android apps published on the Samsung App Store over five years',
          'Shipped Kids Mode — a sandboxed launcher adopted as a Samsung product',
          'Built scalable AWS infrastructure (CDK, Lambda, SQS, CloudFormation) and real-time web scrapers',
          'Developed React/Java/MySQL dashboards for leadership teams on-site in Chicago',
        ],
      },
    ],
  },
  skills: {
    title: 'Skills',
    groups: [
      { label: 'Languages & Runtimes', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js', 'Bun'] },
      { label: 'Frameworks', items: ['React', 'NestJS', 'Tailwind CSS'] },
      { label: 'Build Tools', items: ['Vite', 'Webpack', 'Turbopack', 'RSPack'] },
      { label: 'Cloud & Infra', items: ['AWS', 'Kubernetes', 'Docker'] },
      { label: 'CI/CD', items: ['GitHub Actions', 'Jenkins'] },
      { label: 'AI & Automation', items: ['MCP', 'GitHub Copilot', 'Opencode'] },
    ],
  },
  contact: {
    title: 'Get in Touch',
    links: {
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'Email',
      resume: 'Resume',
    },
    copyright: '© {year} Felipe Vasconcelos',
  },
  languageSwitcher: {
    label: 'Select language',
    languages: {
      en: 'English',
      br: 'Portuguese (Brazil)',
      es: 'Spanish',
    },
  },
};
