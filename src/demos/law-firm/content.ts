import type { DemoDictionary } from "@/demos/content";

/** One numbered practice area, rendered as an expandable engraved row. */
export interface PracticeArea {
  id: string;
  numeral: string;
  name: string;
  summary: string;
  services: string[];
}

/** A named partner, rendered as an engraved monogram card. */
export interface Partner {
  id: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
  bar: string;
  credentials: string[];
}

/** A counter in the results band. */
export interface Stat {
  id: string;
  kind: "currency" | "count" | "percent" | "years";
  value: number;
  suffix?: string;
  label: string;
  caption: string;
}

/** An article in the insights list. */
export interface Article {
  id: string;
  category: string;
  categoryKey: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export interface LawContent {
  format: { locale: string; currency: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    cta: string;
  };
  hero: {
    established: string;
    establishedLabel: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleTrail: string;
    statement: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    scrollCue: string;
    imageAlt: string;
    hallmarks: { value: string; label: string }[];
  };
  practice: {
    eyebrow: string;
    title: string;
    intro: string;
    servicesLabel: string;
    expandAria: string;
    areas: PracticeArea[];
  };
  legacy: {
    quote: string;
    attribution: string;
    role: string;
    imageAlt: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    intro: string;
    focusLabel: string;
    credentialsLabel: string;
    barLabel: string;
    partners: Partner[];
  };
  results: {
    eyebrow: string;
    title: string;
    intro: string;
    footnote: string;
    stats: Stat[];
  };
  insights: {
    eyebrow: string;
    title: string;
    intro: string;
    filterAria: string;
    allLabel: string;
    allKey: string;
    readLabel: string;
    emptyLabel: string;
    articles: Article[];
  };
  consultation: {
    eyebrow: string;
    title: string;
    intro: string;
    asidePoints: { title: string; body: string }[];
    labels: {
      name: string;
      email: string;
      phone: string;
      area: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      area: string;
      message: string;
    };
    areaOptions: string[];
    optionalTag: string;
    submitLabel: string;
    submittingLabel: string;
    privacy: string;
    errors: {
      name: string;
      email: string;
      emailFormat: string;
      area: string;
      message: string;
    };
    success: {
      title: string;
      body: string;
      referenceLabel: string;
      note: string;
      resetLabel: string;
    };
    imageAlt: string;
  };
  footer: {
    blurb: string;
    officesLabel: string;
    offices: { city: string; lines: string[] }[];
    linksLabel: string;
    links: { href: string; label: string }[];
    contactLabel: string;
    phone: string;
    email: string;
    hours: string;
    socialLabel: string;
    social: { label: string; glyph: string }[];
    legal: string;
    credo: string;
  };
}

export const lawDictionary: DemoDictionary<LawContent> = {
  en: {
    format: { locale: "en-US", currency: "USD" },
    header: {
      tagline: "Attorneys at Law · Est. 1926",
      navAria: "Primary",
      nav: [
        { href: "#practice", label: "Practice" },
        { href: "#partners", label: "Partners" },
        { href: "#results", label: "Results" },
        { href: "#insights", label: "Insights" },
      ],
      cta: "Request Consultation",
    },
    hero: {
      established: "MCMXXVI",
      establishedLabel: "Established 1926",
      eyebrow: "Castellan & Reis · Counsel of Record",
      titleLead: "Enduring counsel for",
      titleAccent: "consequential",
      titleTrail: "matters.",
      statement:
        "For four generations, boards, families and founders have retained us when the stakes leave no room for the ordinary.",
      lede: "A full-service firm built on discretion, precedent and the long view. We litigate to win and advise to endure.",
      primaryCta: "Request a Consultation",
      secondaryCta: "Our Practice Areas",
      scrollCue: "Scroll",
      imageAlt: "Bronze scales of justice resting on a dark surface",
      hallmarks: [
        { value: "1926", label: "Founded" },
        { value: "IV", label: "Continents served" },
        { value: "60+", label: "Attorneys" },
      ],
    },
    practice: {
      eyebrow: "What we do",
      title: "Practice Areas",
      intro:
        "Six disciplines, one standard. Each practice is led by partners who have argued, closed and defended at the highest level.",
      servicesLabel: "Representative work",
      expandAria: "Toggle practice area details",
      areas: [
        {
          id: "corporate",
          numeral: "I.",
          name: "Corporate & Mergers",
          summary:
            "Deal counsel for acquisitions, joint ventures and governance from term sheet to close.",
          services: [
            "Cross-border mergers and acquisitions",
            "Private equity and venture financings",
            "Board governance and fiduciary counsel",
            "Shareholder agreements and reorganizations",
          ],
        },
        {
          id: "litigation",
          numeral: "II.",
          name: "Litigation & Arbitration",
          summary:
            "Trial and appellate advocacy in commercial disputes where the outcome defines the enterprise.",
          services: [
            "Complex commercial and contract litigation",
            "International commercial arbitration",
            "Appellate strategy and briefing",
            "Injunctions and emergency relief",
          ],
        },
        {
          id: "realestate",
          numeral: "III.",
          name: "Real Estate & Infrastructure",
          summary:
            "Counsel across acquisition, development and financing of landmark assets and public works.",
          services: [
            "Development and construction agreements",
            "Project finance and public concessions",
            "Commercial leasing and portfolios",
            "Land use, zoning and entitlements",
          ],
        },
        {
          id: "tax",
          numeral: "IV.",
          name: "Tax & Private Wealth",
          summary:
            "Structuring and stewardship for enterprises, family offices and multigenerational estates.",
          services: [
            "Corporate and international tax planning",
            "Trusts, estates and succession",
            "Family office and philanthropy counsel",
            "Tax controversy and voluntary disclosure",
          ],
        },
        {
          id: "labor",
          numeral: "V.",
          name: "Labor & Employment",
          summary:
            "Advisory and defense across the employment lifecycle, from executive contracts to class defense.",
          services: [
            "Executive compensation and separation",
            "Workplace investigations and compliance",
            "Collective bargaining and disputes",
            "Class and collective action defense",
          ],
        },
        {
          id: "ip",
          numeral: "VI.",
          name: "Intellectual Property & Technology",
          summary:
            "Protection and enforcement of the assets that define modern competitive advantage.",
          services: [
            "Patent, trademark and trade-secret litigation",
            "Technology licensing and data agreements",
            "Privacy, AI and regulatory counsel",
            "Portfolio strategy and diligence",
          ],
        },
      ],
    },
    legacy: {
      quote:
        "A firm is not measured by the cases it takes, but by the counsel it keeps when the outcome is uncertain.",
      attribution: "Adriana Castellan",
      role: "Founding & Managing Partner",
      imageAlt: "Two attorneys shaking hands across a table",
    },
    partners: {
      eyebrow: "The bench",
      title: "Our Partners",
      intro:
        "Named partners who lead every engagement personally. Their reputations, and their signatures, stand behind our advice.",
      focusLabel: "Focus",
      credentialsLabel: "Credentials",
      barLabel: "Bar admissions",
      partners: [
        {
          id: "castellan",
          initials: "AC",
          name: "Adriana Castellan",
          role: "Founding & Managing Partner",
          focus: "Corporate governance, complex transactions",
          bar: "New York · São Paulo · London",
          credentials: [
            "J.D., Yale Law School",
            "Chambers Global, Band 1",
            "Former general counsel, Fortune 100",
          ],
        },
        {
          id: "reis",
          initials: "RR",
          name: "Rafael Reis",
          role: "Senior Partner · Head of Litigation",
          focus: "Trial advocacy, international arbitration",
          bar: "New York · Geneva",
          credentials: [
            "LL.M., Harvard Law School",
            "Fellow, Chartered Institute of Arbitrators",
            "Lead counsel in landmark appeals",
          ],
        },
        {
          id: "vasconcelos",
          initials: "HV",
          name: "Helena Vasconcelos",
          role: "Partner · Corporate & Mergers",
          focus: "Cross-border M&A, private equity",
          bar: "São Paulo · Lisbon",
          credentials: [
            "LL.M., London School of Economics",
            "IFLR1000 Leading Lawyer",
            "Advised on USD 40B in transactions",
          ],
        },
        {
          id: "ashworth",
          initials: "TA",
          name: "Thomas Ashworth",
          role: "Partner · Tax & Private Wealth",
          focus: "Succession, family offices, controversy",
          bar: "New York · Zurich",
          credentials: [
            "LL.M. Taxation, NYU School of Law",
            "STEP Trust & Estate Practitioner",
            "Adviser to leading family offices",
          ],
        },
      ],
    },
    results: {
      eyebrow: "By the record",
      title: "Results That Endure",
      intro:
        "A century of advocacy, quantified. Past results do not guarantee future outcomes, but they speak to the standard we hold.",
      footnote:
        "Figures reflect cumulative firm outcomes since 1926 and are provided for illustration only.",
      stats: [
        {
          id: "recovered",
          kind: "currency",
          value: 4_200_000_000,
          label: "Recovered for clients",
          caption: "In judgments and settlements",
        },
        {
          id: "cases",
          kind: "count",
          value: 1240,
          suffix: "+",
          label: "Matters resolved",
          caption: "Across six practice areas",
        },
        {
          id: "success",
          kind: "percent",
          value: 94,
          label: "Trial success rate",
          caption: "In matters taken to verdict",
        },
        {
          id: "years",
          kind: "years",
          value: 100,
          label: "Years of practice",
          caption: "Counsel of record since 1926",
        },
      ],
    },
    insights: {
      eyebrow: "From the firm",
      title: "Insights & Commentary",
      intro:
        "Analysis from our partners on the developments reshaping how enterprises are governed, financed and defended.",
      filterAria: "Filter insights by category",
      allLabel: "All",
      allKey: "all",
      readLabel: "Read",
      emptyLabel: "No commentary in this category yet.",
      articles: [
        {
          id: "governance",
          category: "Corporate",
          categoryKey: "corporate",
          title: "The Board's New Duty of Oversight",
          excerpt:
            "How recent decisions have raised the bar for director diligence, and what boards must document to meet it.",
          date: "June 2026",
          readTime: "7 min",
        },
        {
          id: "arbitration",
          category: "Litigation",
          categoryKey: "litigation",
          title: "Arbitrate or Litigate? Choosing the Forum",
          excerpt:
            "The strategic calculus behind dispute-resolution clauses, and the costs of getting them wrong.",
          date: "May 2026",
          readTime: "9 min",
        },
        {
          id: "privacy",
          category: "Regulatory",
          categoryKey: "regulatory",
          title: "Cross-Border Data and the New Regulators",
          excerpt:
            "Navigating a fragmented privacy landscape when your data, and your exposure, span jurisdictions.",
          date: "April 2026",
          readTime: "6 min",
        },
        {
          id: "succession",
          category: "Tax",
          categoryKey: "tax",
          title: "Succession Planning for the Founder-Led Firm",
          excerpt:
            "Structuring an exit that protects the enterprise, the family and the legacy in equal measure.",
          date: "March 2026",
          readTime: "8 min",
        },
      ],
    },
    consultation: {
      eyebrow: "Retain us",
      title: "Request a Consultation",
      intro:
        "Tell us about your matter in confidence. A partner will review your request personally and respond within two business days.",
      asidePoints: [
        {
          title: "Absolute discretion",
          body: "Every inquiry is protected and reviewed only by the partners it concerns.",
        },
        {
          title: "Partner-led review",
          body: "Your matter is assessed by a named partner, never triaged to a queue.",
        },
        {
          title: "A considered response",
          body: "We reply within two business days with clear next steps.",
        },
      ],
      labels: {
        name: "Full name",
        email: "Email address",
        phone: "Telephone",
        area: "Area of law",
        message: "Describe your matter",
      },
      placeholders: {
        name: "Jane Whitmore",
        email: "you@company.com",
        phone: "+1 (212) 555 0140",
        area: "Select a practice area",
        message: "Share the essentials. Do not include privileged details in this first message.",
      },
      areaOptions: ["General inquiry", "Other matter"],
      optionalTag: "Optional",
      submitLabel: "Submit Request",
      submittingLabel: "Submitting",
      privacy:
        "Submitting this form does not create an attorney-client relationship. Please omit confidential details until we are formally engaged.",
      errors: {
        name: "Please enter your full name.",
        email: "Please enter your email address.",
        emailFormat: "Please enter a valid email address.",
        area: "Please select an area of law.",
        message: "Please describe your matter in a sentence or two.",
      },
      success: {
        title: "Your request is received",
        body: "Thank you. A partner will review the matter personally and respond within two business days.",
        referenceLabel: "Reference",
        note: "A confirmation has been sent to the address you provided.",
        resetLabel: "Submit another request",
      },
      imageAlt: "Attorney reviewing and signing documents at a desk",
    },
    footer: {
      blurb:
        "Castellan & Reis is a full-service law firm advising boards, founders and families across four continents since 1926.",
      officesLabel: "Offices",
      offices: [
        { city: "New York", lines: ["One Chancery Plaza, 40th Floor", "New York, NY 10004"] },
        { city: "São Paulo", lines: ["Av. Faria Lima 3400, 12º andar", "São Paulo, SP 04538"] },
        { city: "London", lines: ["14 Lincoln's Inn Fields", "London WC2A 3EX"] },
      ],
      linksLabel: "Firm",
      links: [
        { href: "#practice", label: "Practice Areas" },
        { href: "#partners", label: "Our Partners" },
        { href: "#results", label: "Results" },
        { href: "#insights", label: "Insights" },
        { href: "#consult", label: "Consultation" },
      ],
      contactLabel: "Contact",
      phone: "+1 (212) 555 0140",
      email: "counsel@castellanreis.com",
      hours: "Monday to Friday · 08:30 – 18:30",
      socialLabel: "Follow",
      social: [
        { label: "Journal", glyph: "share" },
        { label: "Directory", glyph: "globe" },
        { label: "Contact", glyph: "at" },
      ],
      legal: "All rights reserved. Attorney advertising. Prior results do not guarantee a similar outcome.",
      credo: "Counsel of Record since MCMXXVI",
    },
  },

  pt: {
    format: { locale: "pt-BR", currency: "BRL" },
    header: {
      tagline: "Advogados · Fundado em 1926",
      navAria: "Principal",
      nav: [
        { href: "#practice", label: "Atuação" },
        { href: "#partners", label: "Sócios" },
        { href: "#results", label: "Resultados" },
        { href: "#insights", label: "Análises" },
      ],
      cta: "Solicitar Consulta",
    },
    hero: {
      established: "MCMXXVI",
      establishedLabel: "Fundado em 1926",
      eyebrow: "Castellan & Reis · Advogados de Confiança",
      titleLead: "Assessoria duradoura para",
      titleAccent: "as causas",
      titleTrail: "que definem.",
      statement:
        "Há quatro gerações, conselhos, famílias e fundadores nos procuram quando o risco não admite o comum.",
      lede: "Uma banca full-service construída sobre discrição, precedente e visão de longo prazo. Litigamos para vencer e aconselhamos para durar.",
      primaryCta: "Solicitar uma Consulta",
      secondaryCta: "Áreas de Atuação",
      scrollCue: "Rolar",
      imageAlt: "Balança de bronze da justiça sobre superfície escura",
      hallmarks: [
        { value: "1926", label: "Fundação" },
        { value: "IV", label: "Continentes atendidos" },
        { value: "60+", label: "Advogados" },
      ],
    },
    practice: {
      eyebrow: "O que fazemos",
      title: "Áreas de Atuação",
      intro:
        "Seis disciplinas, um só padrão. Cada área é liderada por sócios que já sustentaram, fecharam e defenderam no mais alto nível.",
      servicesLabel: "Trabalhos representativos",
      expandAria: "Alternar detalhes da área de atuação",
      areas: [
        {
          id: "corporate",
          numeral: "I.",
          name: "Societário & Fusões",
          summary:
            "Assessoria em aquisições, joint ventures e governança, do term sheet ao fechamento.",
          services: [
            "Fusões e aquisições transfronteiriças",
            "Private equity e rodadas de venture",
            "Governança e deveres fiduciários",
            "Acordos de acionistas e reorganizações",
          ],
        },
        {
          id: "litigation",
          numeral: "II.",
          name: "Contencioso & Arbitragem",
          summary:
            "Advocacia em juízo e nos tribunais superiores em disputas que definem a empresa.",
          services: [
            "Contencioso empresarial complexo",
            "Arbitragem comercial internacional",
            "Estratégia e razões recursais",
            "Liminares e tutelas de urgência",
          ],
        },
        {
          id: "realestate",
          numeral: "III.",
          name: "Imobiliário & Infraestrutura",
          summary:
            "Assessoria em aquisição, desenvolvimento e financiamento de ativos e obras de referência.",
          services: [
            "Contratos de incorporação e construção",
            "Project finance e concessões públicas",
            "Locações comerciais e portfólios",
            "Uso do solo, zoneamento e licenças",
          ],
        },
        {
          id: "tax",
          numeral: "IV.",
          name: "Tributário & Patrimônio",
          summary:
            "Estruturação e gestão para empresas, family offices e patrimônios multigeracionais.",
          services: [
            "Planejamento tributário nacional e internacional",
            "Sucessão, holdings e heranças",
            "Assessoria a family offices e filantropia",
            "Contencioso tributário e regularizações",
          ],
        },
        {
          id: "labor",
          numeral: "V.",
          name: "Trabalhista & Emprego",
          summary:
            "Consultoria e defesa em todo o ciclo laboral, de contratos de executivos a ações coletivas.",
          services: [
            "Remuneração e desligamento de executivos",
            "Investigações internas e compliance",
            "Negociação coletiva e conflitos",
            "Defesa em ações coletivas",
          ],
        },
        {
          id: "ip",
          numeral: "VI.",
          name: "Propriedade Intelectual & Tecnologia",
          summary:
            "Proteção e defesa dos ativos que definem a vantagem competitiva contemporânea.",
          services: [
            "Litígios de patentes, marcas e segredos",
            "Licenciamento de tecnologia e dados",
            "Privacidade, IA e assessoria regulatória",
            "Estratégia de portfólio e diligências",
          ],
        },
      ],
    },
    legacy: {
      quote:
        "Uma banca não se mede pelas causas que aceita, mas pela assessoria que mantém quando o resultado é incerto.",
      attribution: "Adriana Castellan",
      role: "Sócia Fundadora e Administradora",
      imageAlt: "Dois advogados apertando as mãos sobre uma mesa",
    },
    partners: {
      eyebrow: "O corpo de sócios",
      title: "Nossos Sócios",
      intro:
        "Sócios que conduzem pessoalmente cada mandato. A reputação, e a assinatura, deles respaldam nossa assessoria.",
      focusLabel: "Foco",
      credentialsLabel: "Formação",
      barLabel: "Inscrições",
      partners: [
        {
          id: "castellan",
          initials: "AC",
          name: "Adriana Castellan",
          role: "Sócia Fundadora e Administradora",
          focus: "Governança societária, operações complexas",
          bar: "Nova York · São Paulo · Londres",
          credentials: [
            "J.D., Yale Law School",
            "Chambers Global, Band 1",
            "Ex-diretora jurídica, Fortune 100",
          ],
        },
        {
          id: "reis",
          initials: "RR",
          name: "Rafael Reis",
          role: "Sócio Sênior · Head de Contencioso",
          focus: "Advocacia em juízo, arbitragem internacional",
          bar: "Nova York · Genebra",
          credentials: [
            "LL.M., Harvard Law School",
            "Membro do Chartered Institute of Arbitrators",
            "Advogado líder em recursos emblemáticos",
          ],
        },
        {
          id: "vasconcelos",
          initials: "HV",
          name: "Helena Vasconcelos",
          role: "Sócia · Societário & Fusões",
          focus: "M&A transfronteiriço, private equity",
          bar: "São Paulo · Lisboa",
          credentials: [
            "LL.M., London School of Economics",
            "IFLR1000 Leading Lawyer",
            "Assessorou USD 40 bi em operações",
          ],
        },
        {
          id: "ashworth",
          initials: "TA",
          name: "Thomas Ashworth",
          role: "Sócio · Tributário & Patrimônio",
          focus: "Sucessão, family offices, contencioso",
          bar: "Nova York · Zurique",
          credentials: [
            "LL.M. Tributário, NYU School of Law",
            "STEP Trust & Estate Practitioner",
            "Consultor de family offices de referência",
          ],
        },
      ],
    },
    results: {
      eyebrow: "Pelos números",
      title: "Resultados que Permanecem",
      intro:
        "Um século de advocacia, em números. Resultados passados não garantem os futuros, mas revelam o padrão que mantemos.",
      footnote:
        "Os valores refletem resultados acumulados da banca desde 1926 e servem apenas para ilustração.",
      stats: [
        {
          id: "recovered",
          kind: "currency",
          value: 12_000_000_000,
          label: "Recuperado para clientes",
          caption: "Em condenações e acordos",
        },
        {
          id: "cases",
          kind: "count",
          value: 1240,
          suffix: "+",
          label: "Casos resolvidos",
          caption: "Em seis áreas de atuação",
        },
        {
          id: "success",
          kind: "percent",
          value: 94,
          label: "Índice de êxito em juízo",
          caption: "Em casos levados a julgamento",
        },
        {
          id: "years",
          kind: "years",
          value: 100,
          label: "Anos de atuação",
          caption: "Advogados de confiança desde 1926",
        },
      ],
    },
    insights: {
      eyebrow: "Da banca",
      title: "Análises & Comentários",
      intro:
        "Análises dos nossos sócios sobre o que transforma a governança, o financiamento e a defesa das empresas.",
      filterAria: "Filtrar análises por categoria",
      allLabel: "Todas",
      allKey: "all",
      readLabel: "Ler",
      emptyLabel: "Ainda não há comentários nesta categoria.",
      articles: [
        {
          id: "governance",
          category: "Societário",
          categoryKey: "corporate",
          title: "O Novo Dever de Vigilância do Conselho",
          excerpt:
            "Como decisões recentes elevaram a exigência de diligência e o que o conselho precisa documentar.",
          date: "Junho de 2026",
          readTime: "7 min",
        },
        {
          id: "arbitration",
          category: "Contencioso",
          categoryKey: "litigation",
          title: "Arbitrar ou Litigar? A Escolha do Foro",
          excerpt:
            "O cálculo estratégico por trás das cláusulas de solução de disputas e o custo de errar.",
          date: "Maio de 2026",
          readTime: "9 min",
        },
        {
          id: "privacy",
          category: "Regulatório",
          categoryKey: "regulatory",
          title: "Dados Transfronteiriços e os Novos Reguladores",
          excerpt:
            "Como navegar um cenário fragmentado de privacidade quando dados e riscos cruzam fronteiras.",
          date: "Abril de 2026",
          readTime: "6 min",
        },
        {
          id: "succession",
          category: "Tributário",
          categoryKey: "tax",
          title: "Sucessão na Empresa Familiar",
          excerpt:
            "Estruturar uma saída que proteja a empresa, a família e o legado em igual medida.",
          date: "Março de 2026",
          readTime: "8 min",
        },
      ],
    },
    consultation: {
      eyebrow: "Contrate-nos",
      title: "Solicite uma Consulta",
      intro:
        "Conte-nos sobre o seu caso com total sigilo. Um sócio analisará seu pedido pessoalmente e responderá em até dois dias úteis.",
      asidePoints: [
        {
          title: "Sigilo absoluto",
          body: "Cada contato é protegido e visto apenas pelos sócios responsáveis.",
        },
        {
          title: "Análise por um sócio",
          body: "Seu caso é avaliado por um sócio, nunca encaminhado a uma fila.",
        },
        {
          title: "Uma resposta ponderada",
          body: "Respondemos em até dois dias úteis com próximos passos claros.",
        },
      ],
      labels: {
        name: "Nome completo",
        email: "E-mail",
        phone: "Telefone",
        area: "Área do direito",
        message: "Descreva o seu caso",
      },
      placeholders: {
        name: "Joana Whitmore",
        email: "voce@empresa.com",
        phone: "+55 (11) 95555 0140",
        area: "Selecione uma área",
        message: "Compartilhe o essencial. Não inclua detalhes sigilosos nesta primeira mensagem.",
      },
      areaOptions: ["Consulta geral", "Outro assunto"],
      optionalTag: "Opcional",
      submitLabel: "Enviar Pedido",
      submittingLabel: "Enviando",
      privacy:
        "O envio deste formulário não cria relação advogado-cliente. Por favor, omita detalhes confidenciais até a contratação formal.",
      errors: {
        name: "Informe o seu nome completo.",
        email: "Informe o seu e-mail.",
        emailFormat: "Informe um e-mail válido.",
        area: "Selecione uma área do direito.",
        message: "Descreva o seu caso em uma ou duas frases.",
      },
      success: {
        title: "Seu pedido foi recebido",
        body: "Obrigado. Um sócio analisará o caso pessoalmente e responderá em até dois dias úteis.",
        referenceLabel: "Referência",
        note: "Enviamos uma confirmação para o endereço informado.",
        resetLabel: "Enviar outro pedido",
      },
      imageAlt: "Advogado revisando e assinando documentos em uma mesa",
    },
    footer: {
      blurb:
        "Castellan & Reis é uma banca full-service que assessora conselhos, fundadores e famílias em quatro continentes desde 1926.",
      officesLabel: "Escritórios",
      offices: [
        { city: "Nova York", lines: ["One Chancery Plaza, 40º andar", "Nova York, NY 10004"] },
        { city: "São Paulo", lines: ["Av. Faria Lima 3400, 12º andar", "São Paulo, SP 04538"] },
        { city: "Londres", lines: ["14 Lincoln's Inn Fields", "Londres WC2A 3EX"] },
      ],
      linksLabel: "A banca",
      links: [
        { href: "#practice", label: "Áreas de Atuação" },
        { href: "#partners", label: "Nossos Sócios" },
        { href: "#results", label: "Resultados" },
        { href: "#insights", label: "Análises" },
        { href: "#consult", label: "Consulta" },
      ],
      contactLabel: "Contato",
      phone: "+55 (11) 95555 0140",
      email: "contato@castellanreis.com",
      hours: "Segunda a sexta · 08h30 – 18h30",
      socialLabel: "Acompanhe",
      social: [
        { label: "Boletim", glyph: "share" },
        { label: "Diretório", glyph: "globe" },
        { label: "Contato", glyph: "at" },
      ],
      legal: "Todos os direitos reservados. Publicidade jurídica. Resultados anteriores não garantem resultado semelhante.",
      credo: "Advogados de confiança desde MCMXXVI",
    },
  },

  es: {
    format: { locale: "es-ES", currency: "EUR" },
    header: {
      tagline: "Abogados · Fundado en 1926",
      navAria: "Principal",
      nav: [
        { href: "#practice", label: "Práctica" },
        { href: "#partners", label: "Socios" },
        { href: "#results", label: "Resultados" },
        { href: "#insights", label: "Análisis" },
      ],
      cta: "Solicitar Consulta",
    },
    hero: {
      established: "MCMXXVI",
      establishedLabel: "Fundado en 1926",
      eyebrow: "Castellan & Reis · Abogados de Confianza",
      titleLead: "Asesoramiento duradero para",
      titleAccent: "los asuntos",
      titleTrail: "que importan.",
      statement:
        "Durante cuatro generaciones, consejos, familias y fundadores nos han confiado lo que no admite lo ordinario.",
      lede: "Un despacho full-service cimentado en la discreción, el precedente y la mirada larga. Litigamos para ganar y asesoramos para perdurar.",
      primaryCta: "Solicitar una Consulta",
      secondaryCta: "Áreas de Práctica",
      scrollCue: "Bajar",
      imageAlt: "Balanza de bronce de la justicia sobre una superficie oscura",
      hallmarks: [
        { value: "1926", label: "Fundación" },
        { value: "IV", label: "Continentes atendidos" },
        { value: "60+", label: "Abogados" },
      ],
    },
    practice: {
      eyebrow: "Qué hacemos",
      title: "Áreas de Práctica",
      intro:
        "Seis disciplinas, un único estándar. Cada área la dirigen socios que han litigado, cerrado y defendido al más alto nivel.",
      servicesLabel: "Trabajos representativos",
      expandAria: "Alternar detalles del área de práctica",
      areas: [
        {
          id: "corporate",
          numeral: "I.",
          name: "Mercantil & Fusiones",
          summary:
            "Asesoramiento en adquisiciones, joint ventures y gobierno corporativo, del term sheet al cierre.",
          services: [
            "Fusiones y adquisiciones transfronterizas",
            "Private equity y rondas de venture",
            "Gobierno corporativo y deberes fiduciarios",
            "Pactos de socios y reorganizaciones",
          ],
        },
        {
          id: "litigation",
          numeral: "II.",
          name: "Litigio & Arbitraje",
          summary:
            "Defensa ante tribunales y en apelación en disputas que definen a la empresa.",
          services: [
            "Litigio mercantil y contractual complejo",
            "Arbitraje comercial internacional",
            "Estrategia y escritos de apelación",
            "Medidas cautelares y de urgencia",
          ],
        },
        {
          id: "realestate",
          numeral: "III.",
          name: "Inmobiliario & Infraestructura",
          summary:
            "Asesoramiento en adquisición, desarrollo y financiación de activos y obras emblemáticas.",
          services: [
            "Contratos de promoción y construcción",
            "Project finance y concesiones públicas",
            "Arrendamientos comerciales y carteras",
            "Urbanismo, zonificación y licencias",
          ],
        },
        {
          id: "tax",
          numeral: "IV.",
          name: "Fiscal & Patrimonio",
          summary:
            "Estructuración y custodia para empresas, family offices y patrimonios multigeneracionales.",
          services: [
            "Planificación fiscal nacional e internacional",
            "Sucesiones, fideicomisos y herencias",
            "Asesoría a family offices y filantropía",
            "Contencioso fiscal y regularizaciones",
          ],
        },
        {
          id: "labor",
          numeral: "V.",
          name: "Laboral & Empleo",
          summary:
            "Asesoría y defensa en todo el ciclo laboral, de contratos de directivos a acciones colectivas.",
          services: [
            "Retribución y salida de directivos",
            "Investigaciones internas y compliance",
            "Negociación colectiva y conflictos",
            "Defensa en acciones colectivas",
          ],
        },
        {
          id: "ip",
          numeral: "VI.",
          name: "Propiedad Intelectual & Tecnología",
          summary:
            "Protección y defensa de los activos que definen la ventaja competitiva moderna.",
          services: [
            "Litigios de patentes, marcas y secretos",
            "Licencias de tecnología y datos",
            "Privacidad, IA y asesoría regulatoria",
            "Estrategia de cartera y due diligence",
          ],
        },
      ],
    },
    legacy: {
      quote:
        "Un despacho no se mide por los casos que acepta, sino por el consejo que sostiene cuando el resultado es incierto.",
      attribution: "Adriana Castellan",
      role: "Socia Fundadora y Directora",
      imageAlt: "Dos abogados estrechándose la mano sobre una mesa",
    },
    partners: {
      eyebrow: "El cuadro de socios",
      title: "Nuestros Socios",
      intro:
        "Socios que dirigen personalmente cada encargo. Su reputación, y su firma, respaldan nuestro asesoramiento.",
      focusLabel: "Enfoque",
      credentialsLabel: "Credenciales",
      barLabel: "Colegiaciones",
      partners: [
        {
          id: "castellan",
          initials: "AC",
          name: "Adriana Castellan",
          role: "Socia Fundadora y Directora",
          focus: "Gobierno corporativo, operaciones complejas",
          bar: "Nueva York · São Paulo · Londres",
          credentials: [
            "J.D., Yale Law School",
            "Chambers Global, Band 1",
            "Ex directora jurídica, Fortune 100",
          ],
        },
        {
          id: "reis",
          initials: "RR",
          name: "Rafael Reis",
          role: "Socio Sénior · Director de Litigio",
          focus: "Defensa en juicio, arbitraje internacional",
          bar: "Nueva York · Ginebra",
          credentials: [
            "LL.M., Harvard Law School",
            "Miembro del Chartered Institute of Arbitrators",
            "Abogado principal en apelaciones señeras",
          ],
        },
        {
          id: "vasconcelos",
          initials: "HV",
          name: "Helena Vasconcelos",
          role: "Socia · Mercantil & Fusiones",
          focus: "M&A transfronterizo, private equity",
          bar: "São Paulo · Lisboa",
          credentials: [
            "LL.M., London School of Economics",
            "IFLR1000 Leading Lawyer",
            "Asesoró USD 40.000 M en operaciones",
          ],
        },
        {
          id: "ashworth",
          initials: "TA",
          name: "Thomas Ashworth",
          role: "Socio · Fiscal & Patrimonio",
          focus: "Sucesión, family offices, contencioso",
          bar: "Nueva York · Zúrich",
          credentials: [
            "LL.M. Fiscal, NYU School of Law",
            "STEP Trust & Estate Practitioner",
            "Asesor de destacados family offices",
          ],
        },
      ],
    },
    results: {
      eyebrow: "Por el historial",
      title: "Resultados que Perduran",
      intro:
        "Un siglo de defensa, en cifras. Los resultados pasados no garantizan los futuros, pero reflejan el estándar que mantenemos.",
      footnote:
        "Las cifras reflejan resultados acumulados del despacho desde 1926 y se ofrecen solo a título ilustrativo.",
      stats: [
        {
          id: "recovered",
          kind: "currency",
          value: 3_800_000_000,
          label: "Recuperado para clientes",
          caption: "En condenas y acuerdos",
        },
        {
          id: "cases",
          kind: "count",
          value: 1240,
          suffix: "+",
          label: "Asuntos resueltos",
          caption: "En seis áreas de práctica",
        },
        {
          id: "success",
          kind: "percent",
          value: 94,
          label: "Tasa de éxito en juicio",
          caption: "En asuntos llevados a sentencia",
        },
        {
          id: "years",
          kind: "years",
          value: 100,
          label: "Años de ejercicio",
          caption: "Abogados de confianza desde 1926",
        },
      ],
    },
    insights: {
      eyebrow: "Del despacho",
      title: "Análisis & Comentarios",
      intro:
        "Análisis de nuestros socios sobre lo que transforma el gobierno, la financiación y la defensa de las empresas.",
      filterAria: "Filtrar análisis por categoría",
      allLabel: "Todos",
      allKey: "all",
      readLabel: "Leer",
      emptyLabel: "Aún no hay comentarios en esta categoría.",
      articles: [
        {
          id: "governance",
          category: "Mercantil",
          categoryKey: "corporate",
          title: "El Nuevo Deber de Vigilancia del Consejo",
          excerpt:
            "Cómo decisiones recientes elevaron la exigencia de diligencia y qué debe documentar el consejo.",
          date: "Junio de 2026",
          readTime: "7 min",
        },
        {
          id: "arbitration",
          category: "Litigio",
          categoryKey: "litigation",
          title: "¿Arbitrar o Litigar? Elegir el Foro",
          excerpt:
            "El cálculo estratégico tras las cláusulas de resolución de disputas y el coste de equivocarse.",
          date: "Mayo de 2026",
          readTime: "9 min",
        },
        {
          id: "privacy",
          category: "Regulatorio",
          categoryKey: "regulatory",
          title: "Datos Transfronterizos y los Nuevos Reguladores",
          excerpt:
            "Cómo navegar un panorama fragmentado de privacidad cuando datos y riesgos cruzan fronteras.",
          date: "Abril de 2026",
          readTime: "6 min",
        },
        {
          id: "succession",
          category: "Fiscal",
          categoryKey: "tax",
          title: "Planificación Sucesoria en la Empresa Familiar",
          excerpt:
            "Estructurar una salida que proteja a la empresa, la familia y el legado por igual.",
          date: "Marzo de 2026",
          readTime: "8 min",
        },
      ],
    },
    consultation: {
      eyebrow: "Contrátenos",
      title: "Solicite una Consulta",
      intro:
        "Cuéntenos su asunto con total confidencialidad. Un socio revisará su solicitud personalmente y responderá en dos días hábiles.",
      asidePoints: [
        {
          title: "Discreción absoluta",
          body: "Cada consulta está protegida y solo la revisan los socios que corresponde.",
        },
        {
          title: "Revisión por un socio",
          body: "Su asunto lo evalúa un socio, nunca se deriva a una cola.",
        },
        {
          title: "Una respuesta meditada",
          body: "Respondemos en dos días hábiles con próximos pasos claros.",
        },
      ],
      labels: {
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        area: "Área del derecho",
        message: "Describa su asunto",
      },
      placeholders: {
        name: "Juana Whitmore",
        email: "usted@empresa.com",
        phone: "+34 910 555 0140",
        area: "Seleccione un área",
        message: "Comparta lo esencial. No incluya detalles privilegiados en este primer mensaje.",
      },
      areaOptions: ["Consulta general", "Otro asunto"],
      optionalTag: "Opcional",
      submitLabel: "Enviar Solicitud",
      submittingLabel: "Enviando",
      privacy:
        "El envío de este formulario no crea una relación abogado-cliente. Omita detalles confidenciales hasta la contratación formal.",
      errors: {
        name: "Introduzca su nombre completo.",
        email: "Introduzca su correo electrónico.",
        emailFormat: "Introduzca un correo válido.",
        area: "Seleccione un área del derecho.",
        message: "Describa su asunto en una o dos frases.",
      },
      success: {
        title: "Su solicitud se ha recibido",
        body: "Gracias. Un socio revisará el asunto personalmente y responderá en dos días hábiles.",
        referenceLabel: "Referencia",
        note: "Hemos enviado una confirmación a la dirección indicada.",
        resetLabel: "Enviar otra solicitud",
      },
      imageAlt: "Abogado revisando y firmando documentos en un escritorio",
    },
    footer: {
      blurb:
        "Castellan & Reis es un despacho full-service que asesora a consejos, fundadores y familias en cuatro continentes desde 1926.",
      officesLabel: "Oficinas",
      offices: [
        { city: "Nueva York", lines: ["One Chancery Plaza, planta 40", "Nueva York, NY 10004"] },
        { city: "São Paulo", lines: ["Av. Faria Lima 3400, piso 12", "São Paulo, SP 04538"] },
        { city: "Londres", lines: ["14 Lincoln's Inn Fields", "Londres WC2A 3EX"] },
      ],
      linksLabel: "El despacho",
      links: [
        { href: "#practice", label: "Áreas de Práctica" },
        { href: "#partners", label: "Nuestros Socios" },
        { href: "#results", label: "Resultados" },
        { href: "#insights", label: "Análisis" },
        { href: "#consult", label: "Consulta" },
      ],
      contactLabel: "Contacto",
      phone: "+34 910 555 0140",
      email: "contacto@castellanreis.com",
      hours: "Lunes a viernes · 08:30 – 18:30",
      socialLabel: "Síganos",
      social: [
        { label: "Boletín", glyph: "share" },
        { label: "Directorio", glyph: "globe" },
        { label: "Contacto", glyph: "at" },
      ],
      legal: "Todos los derechos reservados. Publicidad jurídica. Los resultados anteriores no garantizan un resultado similar.",
      credo: "Abogados de confianza desde MCMXXVI",
    },
  },
};
