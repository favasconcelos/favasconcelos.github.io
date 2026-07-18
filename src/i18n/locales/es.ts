import type { Translation } from '@/i18n/types';

export const es: Translation = {
  meta: {
    description:
      'Felipe Vasconcelos — Ingeniero de Software Senior y Líder del Frontend Chapter en adidas. Construyendo plataformas de micro-frontends, herramientas de desarrollo con IA y sistemas cloud-native.',
    ogTitle: 'Felipe Vasconcelos — Ingeniero de Software Senior',
    ogDescription: 'Líder del Frontend Chapter en adidas. Construyendo plataformas de micro-frontends, herramientas de desarrollo con IA y sistemas cloud-native.',
    twitterTitle: 'Felipe Vasconcelos — Ingeniero de Software Senior',
    twitterDescription: 'Líder del Frontend Chapter en adidas. Construyendo plataformas de micro-frontends, herramientas de desarrollo con IA y sistemas cloud-native.',
  },
  skipToContent: 'Saltar al contenido',
  hero: {
    role: 'Ingeniero de Software Senior',
    tagline: 'Líder del Frontend Chapter en adidas. Construyendo plataformas de micro-frontends, herramientas de desarrollo con IA y sistemas cloud-native.',
    quote: 'De los tambores de Recife al DOM — mismo ritmo, escenario diferente.',
    location: 'Zaragoza, España',
    origin: 'Originario de Recife, Brasil',
  },
  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Ingeniero de Software Senior con más de 15 años construyendo productos full-stack en mobile, web y cloud. Lidero un equipo de 3 ingenieros, co-lidero el Frontend Chapter y soy responsable de la arquitectura de una plataforma de micro-frontends utilizada por varios equipos de producto. Creo integraciones personalizadas con IA usando herramientas MCP que conectan sistemas de ingeniería y aceleran la entrega.',
      'Nacido en Recife, Brasil, llevo esa misma energía a la ingeniería: constante, persistente y siempre alineado con el equipo.',
    ],
  },
  experience: {
    title: 'Experiencia',
    roles: [
      {
        company: 'adidas',
        title: 'Ingeniero de Software Senior · Líder del Frontend Chapter',
        period: 'Jun 2019 hasta la actualidad',
        location: 'Zaragoza, España',
        sections: [
          {
            heading: 'Liderazgo',
            items: [
              'Gestiono 3 reportes directos con reuniones 1:1, evaluaciones de desempeño y planificación de carrera',
              'Co-lidero el Frontend Chapter como uno de los 3 líderes técnicos, estableciendo estándares de arquitectura para la plataforma de micro-frontends',
            ],
          },
          {
            heading: 'Integración de IA y Herramientas',
            items: [
              'Construí una cadena de herramientas MCP integrando Instana, Bitbucket, Jira, Confluence y GitHub para habilitar flujos de trabajo asistidos por IA',
              'Dirigí un experimento de un mes de entrega acelerada por IA combinando GitHub Copilot, Figma AI y herramientas MCP personalizadas',
              'Construyendo un servidor MCP que indexa múltiples repositorios en una base de conocimiento consultable para agentes de IA en todo el departamento',
            ],
          },
          {
            heading: 'Ingeniería de Plataforma',
            items: [
              'Lideré la reescritura de un sistema legacy entregada en 2 meses frente a una estimación de 1 año, integrando herramientas de IA en todas las disciplinas de ingeniería',
              'Diseñé un sistema de notificaciones en tiempo real en AWS (CDK, Lambda, DynamoDB, API Gateway) que atiende ~3.000 usuarios concurrentes',
              'Migré el shell de micro-frontends de Webpack a Vite; reescribí pipelines de bibliotecas compartidas de Jenkins en Groovy para reutilización entre equipos',
              'Lideré la migración de Jest a Vitest — logré más de 40% de reducción en el tiempo de CI, benchmark con Hyperfine en varios entornos',
            ],
          },
        ],
      },
      {
        company: 'Stellar Fusion',
        title: 'Ingeniero Full-Stack (Contrato)',
        period: 'Jun 2021 a Jul 2022',
        location: 'Remoto',
        highlights: [
          'Lideré el desarrollo full-stack como líder de equipo (React + Node.js)',
          'Construí un motor de evaluación de fórmulas inspirado en Excel que se ejecuta isomórficamente en el navegador y el backend',
        ],
      },
      {
        company: 'CESAR · Samsung · Motorola',
        title: 'Ingeniero de Software → Líder Técnico',
        period: 'Dic 2010 a May 2019',
        location: 'Recife, Brasil',
        highlights: [
          'Construí más de 20 aplicaciones Android publicadas en Samsung App Store a lo largo de cinco años',
          'Lancé Kids Mode — un launcher sandbox adoptado como producto Samsung',
          'Construí infraestructura escalable en AWS (CDK, Lambda, SQS, CloudFormation) y web scrapers en tiempo real',
          'Desarrollé dashboards React/Java/MySQL para equipos de liderazgo in situ en Chicago',
        ],
      },
    ],
  },
  skills: {
    title: 'Habilidades',
    groups: [
      { label: 'Lenguajes y Runtimes', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js', 'Bun'] },
      { label: 'Frameworks', items: ['React', 'NestJS', 'Tailwind CSS'] },
      { label: 'Herramientas de Build', items: ['Vite', 'Webpack', 'Turbopack', 'RSPack'] },
      { label: 'Cloud e Infra', items: ['AWS', 'Kubernetes', 'Docker'] },
      { label: 'CI/CD', items: ['GitHub Actions', 'Jenkins'] },
      { label: 'IA y Automatización', items: ['MCP', 'GitHub Copilot', 'Opencode'] },
    ],
  },
  contact: {
    title: 'Contacto',
    links: {
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'Correo',
      resume: 'Currículum',
    },
    copyright: '© {year} Felipe Vasconcelos',
  },
  languageSwitcher: {
    label: 'Seleccionar idioma',
    languages: {
      en: 'Inglés',
      br: 'Portugués (Brasil)',
      es: 'Español',
    },
  },
};
