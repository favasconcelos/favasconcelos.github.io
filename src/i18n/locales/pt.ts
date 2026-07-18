import type { Translation } from '@/i18n/types';

export const pt: Translation = {
  meta: {
    description:
      'Felipe Vasconcelos — Engenheiro de Software Sênior e Líder do Frontend Chapter na adidas. Construindo plataformas de micro-frontends, ferramentas de desenvolvimento com IA e sistemas cloud-native.',
    ogTitle: 'Felipe Vasconcelos — Engenheiro de Software Sênior',
    ogDescription: 'Líder do Frontend Chapter na adidas. Construindo plataformas de micro-frontends, ferramentas de desenvolvimento com IA e sistemas cloud-native.',
    twitterTitle: 'Felipe Vasconcelos — Engenheiro de Software Sênior',
    twitterDescription: 'Líder do Frontend Chapter na adidas. Construindo plataformas de micro-frontends, ferramentas de desenvolvimento com IA e sistemas cloud-native.',
  },
  skipToContent: 'Pular para o conteúdo',
  hero: {
    role: 'Engenheiro de Software Sênior',
    tagline: 'Líder do Frontend Chapter na adidas. Construindo plataformas de micro-frontends, ferramentas de desenvolvimento com IA e sistemas cloud-native.',
    quote: 'Dos tambores do Recife ao DOM — mesmo ritmo, palco diferente.',
    location: 'Zaragoza, Espanha',
    origin: 'Natural de Recife, Brasil',
  },
  about: {
    title: 'Sobre',
    paragraphs: [
      'Engenheiro de Software Sênior com mais de 15 anos construindo produtos full-stack em mobile, web e cloud. Lidero uma equipe de 3 engenheiros, co-lidero o Frontend Chapter e sou responsável pela arquitetura de uma plataforma de micro-frontends usada por vários times de produto. Crio integrações personalizadas com IA usando ferramentas MCP que conectam sistemas de engenharia e aceleram a entrega.',
      'Nascido em Recife, Brasil, levo a mesma energia para a engenharia: consistente, persistente e sempre alinhado com o time.',
    ],
  },
  experience: {
    title: 'Experiência',
    roles: [
      {
        company: 'adidas',
        title: 'Engenheiro de Software Sênior · Líder do Frontend Chapter',
        period: 'Jun 2019 até o momento',
        location: 'Zaragoza, Espanha',
        sections: [
          {
            heading: 'Liderança',
            items: [
              'Gerencio 3 reportes diretos com reuniões 1:1, avaliações de desempenho e planejamento de carreira',
              'Co-lidero o Frontend Chapter como um dos 3 líderes técnicos, definindo padrões de arquitetura para a plataforma de micro-frontends',
            ],
          },
          {
            heading: 'Integração de IA e Ferramentas',
            items: [
              'Construí uma cadeia de ferramentas MCP integrando Instana, Bitbucket, Jira, Confluence e GitHub para permitir fluxos de trabalho assistidos por IA',
              'Conduzi um experimento de um mês de entrega acelerada por IA combinando GitHub Copilot, Figma AI e ferramentas MCP personalizadas',
              'Construindo um servidor MCP que indexa vários repositórios em uma base de conhecimento consultável para agentes de IA em todo o departamento',
            ],
          },
          {
            heading: 'Engenharia de Plataforma',
            items: [
              'Liderei a reescrita de um sistema legado entregue em 2 meses contra uma estimativa de 1 ano, integrando ferramentas de IA em todas as disciplinas de engenharia',
              'Projetei um sistema de notificações em tempo real na AWS (CDK, Lambda, DynamoDB, API Gateway) atendendo ~3.000 usuários simultâneos',
              'Migrei o shell de micro-frontends de Webpack para Vite; reescrevi pipelines de bibliotecas compartilhadas do Jenkins em Groovy para reutilização entre times',
              'Liderei a migração de Jest para Vitest — alcancei mais de 40% de redução no tempo de CI, benchmark com Hyperfine em vários ambientes',
            ],
          },
        ],
      },
      {
        company: 'Stellar Fusion',
        title: 'Engenheiro Full-Stack (Contrato)',
        period: 'Jun 2021 a Jul 2022',
        location: 'Remoto',
        highlights: [
          'Liderei o desenvolvimento full-stack como líder de equipe (React + Node.js)',
          'Construí um motor de avaliação de fórmulas inspirado no Excel executando isomorficamente no navegador e no backend',
        ],
      },
      {
        company: 'CESAR · Samsung · Motorola',
        title: 'Engenheiro de Software → Líder Técnico',
        period: 'Dez 2010 a Mai 2019',
        location: 'Recife, Brasil',
        highlights: [
          'Construí mais de 20 aplicativos Android publicados na Samsung App Store ao longo de cinco anos',
          'Lancei o Kids Mode — um launcher sandbox adotado como produto Samsung',
          'Construí infraestrutura escalável na AWS (CDK, Lambda, SQS, CloudFormation) e web scrapers em tempo real',
          'Desenvolvi dashboards React/Java/MySQL para equipes de liderança no local em Chicago',
        ],
      },
    ],
  },
  skills: {
    title: 'Habilidades',
    groups: [
      { label: 'Linguagens e Runtimes', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js', 'Bun'] },
      { label: 'Frameworks', items: ['React', 'NestJS', 'Tailwind CSS'] },
      { label: 'Ferramentas de Build', items: ['Vite', 'Webpack', 'Turbopack', 'RSPack'] },
      { label: 'Cloud e Infra', items: ['AWS', 'Kubernetes', 'Docker'] },
      { label: 'CI/CD', items: ['GitHub Actions', 'Jenkins'] },
      { label: 'IA e Automação', items: ['MCP', 'GitHub Copilot', 'Opencode'] },
    ],
  },
  contact: {
    title: 'Entre em Contato',
    links: {
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'E-mail',
      resume: 'Currículo',
    },
    copyright: '© {year} Felipe Vasconcelos',
  },
  languageSwitcher: {
    label: 'Selecionar idioma',
    languages: {
      en: 'Inglês',
      pt: 'Português',
      es: 'Espanhol',
    },
  },
};
