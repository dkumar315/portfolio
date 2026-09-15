import { site } from "@/lib/site";

import type {
  Credential,
  Education,
  Experience,
  InternalHref,
  NavigationItem,
  Project,
  SkillGroup,
} from "./types";

export const routes = {
  home: "/" as InternalHref,
  experience: "/experience" as InternalHref,
  projects: "/projects" as InternalHref,
  about: "/about" as InternalHref,
  resume: "/resume" as InternalHref,
  contact: "/contact" as InternalHref,
  ruptureLab: "/projects/rupturelab" as InternalHref,
  nat: "/projects/nat" as InternalHref,
  wheatSegmentation: "/projects/wheat-segmentation" as InternalHref,
  xrfm: "/projects/xrfm" as InternalHref,
} as const;

export const primaryNavigation = [
  { label: "Experience", href: routes.experience },
  { label: "Projects", href: routes.projects },
  { label: "About", href: routes.about },
  { label: "Resume", href: routes.resume },
  { label: "Contact", href: routes.contact },
] as const satisfies readonly NavigationItem[];

export const profile = {
  ...site,
  location: "Sydney, Australia",
  positioning:
    "Software engineer focused on reliable backend systems and polished full-stack products.",
  introduction:
    "Completed a Bachelor of Science (Computer Science) at UNSW with professional engineering experience across Python, FastAPI, TypeScript, React, APIs, databases, testing and production web systems.",
} as const;

export const experiences: readonly Experience[] = [
  {
    slug: "armsoa",
    role: "Software Engineer",
    organisation: "Arms Operations Analysis Pty Ltd",
    location: "Sydney, Australia · Remote",
    period: "Aug 2026 – Sep 2026",
    category: "engineering",
    isCurrent: false,
    summary:
      "Selected for paid follow-on engineering after an industry-client capstone to help mature a network correction and recovery concept demonstrator.",
    highlights: [
      "Engineered Python/FastAPI and React/TypeScript capabilities spanning network simulation, monitoring, RF/network degradation analysis and recovery workflows.",
      "Worked across tactical interfaces, recovery-drone simulation, REST/OpenAPI APIs, Docker deployment, automated testing and end-to-end integration.",
      "Helped consolidate multiple software prototypes into a unified demonstrator while preserving clear boundaries between simulation and operator decision support.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "REST/OpenAPI",
      "Docker",
    ],
  },
  {
    slug: "tandem-learning",
    role: "Software Engineering Intern",
    organisation: "Tandem Learning",
    location: "Sydney, Australia · Hybrid",
    period: "Oct 2025 – Mar 2026",
    category: "engineering",
    isCurrent: false,
    summary:
      "Shipped production full-stack features for a live education platform in a small product engineering team.",
    highlights: [
      "Developed and shipped 8–10 production features using Next.js, React, TypeScript, Prisma and Drizzle ORM.",
      "Built and stabilised multi-step assessment configuration, attempt and results workflows while resolving routing, TypeScript and production-build issues.",
      "Worked on AI-assisted grading and chat workflows, including streamed responses, tool integrations, prompt behaviour and client/server message handling.",
      "Integrated product analytics and resolved issues across rendering, APIs, validation, database-backed workflows and CI/build pipelines.",
      "Contributed to a platform supporting 1,642+ students and 8,026+ assessment attempts.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Drizzle ORM",
      "PostHog",
    ],
  },
  {
    slug: "shalom-tutor",
    role: "Academic Tutor",
    organisation: "Shalom College UNSW",
    location: "Sydney, Australia · On-site",
    period: "Mar 2026 – Present",
    category: "education",
    isCurrent: true,
    summary:
      "Provide individual and small-group university tutoring across technical and quantitative subjects.",
    highlights: [
      "Tutor computer science, mathematics, physics, accounting and finance.",
      "Mentor 3–5 recurring students weekly while supporting a 130+ student residential community.",
      "Focus on conceptual understanding, structured problem solving and independent learning.",
    ],
  },
  {
    slug: "shalom-ra",
    role: "Summer Resident Advisor",
    organisation: "Shalom College UNSW",
    location: "Sydney, Australia · On-site",
    period: "Dec 2025 – Feb 2026",
    category: "leadership",
    isCurrent: false,
    summary:
      "Served as the primary after-hours contact for a large residential community.",
    highlights: [
      "Oversaw safety, operational continuity and incident response for 130+ residents.",
      "Managed overnight and weekend shifts requiring independent judgement and escalation management.",
      "Acted as Chief Fire Warden when required.",
    ],
  },
  {
    slug: "shalom-treasurer",
    role: "Treasurer",
    organisation: "Shalom College UNSW",
    location: "Sydney, Australia · On-site",
    period: "Oct 2024 – Feb 2026",
    category: "leadership",
    isCurrent: false,
    summary:
      "Managed financial planning and governance for a residential student community.",
    highlights: [
      "Managed a $35,000+ student budget supporting 130+ residents.",
      "Supported financial planning across 20+ events and identified approximately $2,000–$4,000 in savings.",
      "Worked within an eight-member student leadership team.",
    ],
  },
];

export const projects: readonly Project[] = [
  {
    slug: "rupturelab",
    title: "RuptureLab — API Resilience Testing Workbench",
    shortTitle: "RuptureLab",
    period: "Sep 2026",
    kind: "independent",
    tier: "flagship",
    featuredRank: 1,
    team: "Independent project",
    summary:
      "A full-stack API resilience workbench for controlled baseline, failure and recovery experiments against HTTP services.",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "Server-Sent Events",
    ],
    highlights: [
      "Built a configurable reverse proxy and control plane for fault injection, experiment orchestration and resilience-contract evaluation.",
      "Implemented live Server-Sent Events monitoring, durable PostgreSQL state and explicit baseline, fault and recovery phases.",
      "Built a production-style dashboard and reproducible Docker Compose environment with Alembic migrations and CI.",
      "Added request-target security hardening and correctness rules including one-active-experiment enforcement and event replay.",
    ],
    proof: [
      "Released publicly as v1.0.0.",
      "108 backend tests with 100% line and branch coverage across project-owned backend code.",
      "53 frontend unit/component tests with 100% statements, branches, functions and lines across project-owned frontend logic.",
      "Five Chromium Playwright dashboard flows plus production Compose/browser validation.",
    ],
    sourceAccess: "public",
    repoUrl: "https://github.com/dkumar315/rupture-lab",
    caseStudyHref: routes.ruptureLab,
  },
  {
    slug: "nat",
    title: "Network Analytic Tool — Industry Client Capstone",
    shortTitle: "Network Analytic Tool",
    period: "Jun 2026 – Aug 2026",
    kind: "industry",
    tier: "featured",
    featuredRank: 2,
    team: "Five-person engineering team · Scrum Master / Systems Architect / DevOps",
    summary:
      "A Dockerised network-resilience platform combining simulation, monitoring, resilient communications planning, terrain-aware RF analysis and recovery workflows.",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Docker",
      "REST/OpenAPI",
      "MapLibre",
    ],
    highlights: [
      "Architected and integrated backend services, shared API contracts and interactive frontend workflows.",
      "Worked across scenario simulation, network-health monitoring, stress events, PACE communications, RF degradation modelling and recovery-drone workflows.",
      "Led technical delivery across Jira/Git workflows, client requirements, demonstrations, QA and final handover.",
      "Kept the network simulator and deterministic operator tooling separate from any external decision layer.",
    ],
    proof: [
      "Industry-client UNSW Computer Science capstone.",
      "Five-person engineering team.",
      "Awarded 94 HD for COMP3900.",
      "The capstone led to paid follow-on software engineering work with Arms Operations Analysis.",
    ],
    sourceAccess: "private-client",
    caseStudyHref: routes.nat,
  },
  {
    slug: "wheat-segmentation",
    title: "Computer Vision — Wheat Crop Segmentation",
    shortTitle: "Wheat Crop Segmentation",
    period: "Feb 2026 – May 2026",
    kind: "coursework",
    tier: "featured",
    featuredRank: 3,
    team: "Group computer vision project",
    summary:
      "A comparative semantic-segmentation study spanning classical computer vision, clustering, graph-based learning and deep learning.",
    stack: [
      "Python",
      "PyTorch",
      "U-Net",
      "ResNet50",
      "Random Forest",
      "CRF",
      "Computer Vision",
    ],
    highlights: [
      "Evaluated four segmentation approaches across classical, clustering, graph-based and deep-learning paradigms.",
      "Built a U-Net workflow with an ImageNet-pretrained ResNet50 encoder, augmentation and structured evaluation.",
      "Compared predictive quality, robustness and inference trade-offs rather than reporting a single headline metric.",
    ],
    proof: [
      "U-Net achieved approximately 0.910 IoU and 0.953 F1 on the test set.",
      "Graph-based Superpixel + CRF achieved approximately 0.843 IoU on clean images.",
      "The study evaluated robustness across clean and distorted image conditions.",
    ],
    sourceAccess: "private-coursework",
    caseStudyHref: routes.wheatSegmentation,
  },
  {
    slug: "xrfm",
    title: "xRFM — Tabular ML Benchmarking",
    shortTitle: "xRFM Benchmarking",
    period: "Feb 2026 – May 2026",
    kind: "coursework",
    tier: "featured",
    featuredRank: 4,
    team: "Five-person machine learning project",
    summary:
      "A replication and evaluation of xRFM against Random Forest and XGBoost across classification and regression datasets.",
    stack: [
      "Python",
      "xRFM",
      "XGBoost",
      "Random Forest",
      "Pandas",
      "OpenML",
      "Machine Learning",
    ],
    highlights: [
      "Benchmarked xRFM, Random Forest and XGBoost across six tabular datasets.",
      "Built reproducible preprocessing, validation, training and evaluation workflows for classification and regression.",
      "Compared AGOP-based feature importance with PCA, mutual information and permutation importance.",
      "Evaluated predictive performance, computational efficiency, scalability and interpretability.",
    ],
    proof: [
      "Six OpenML datasets spanning classification and regression.",
      "Included a scaling experiment on the 21,000+ sample Superconduct dataset.",
      "Found xRFM competitive in several settings while XGBoost was the most consistent overall performer.",
    ],
    sourceAccess: "private-coursework",
    caseStudyHref: routes.xrfm,
  },
  {
    slug: "bittrickle",
    title: "BitTrickle — Peer-to-Peer File Sharing System",
    shortTitle: "BitTrickle",
    period: "Sep 2024 – Dec 2024",
    kind: "coursework",
    tier: "selected",
    featuredRank: 5,
    team: "Individual networking project",
    summary:
      "A Python peer-to-peer file-sharing system using UDP control messaging and direct TCP file transfer.",
    stack: [
      "Python",
      "UDP",
      "TCP",
      "Sockets",
      "Multithreading",
      "Application-Layer Protocols",
    ],
    highlights: [
      "Designed a custom application-layer protocol covering authentication, peer discovery, publishing, search and retrieval.",
      "Implemented heartbeat-based liveness tracking and server-side session state.",
      "Used direct peer-to-peer TCP connections for file transfer while retaining UDP for control messages.",
    ],
    proof: [
      "Implemented separate client and server components.",
      "Included concurrent file serving and peer liveness tracking.",
      "Documented deployment limitations including local-only addressing and unencrypted transfers.",
    ],
    sourceAccess: "private-coursework",
  },
  {
    slug: "os161-vm",
    title: "OS/161 Virtual Memory",
    shortTitle: "OS/161 Virtual Memory",
    period: "May 2025 – Aug 2025",
    kind: "coursework",
    tier: "selected",
    featuredRank: 6,
    team: "Advanced operating-systems coursework",
    summary:
      "Kernel-level virtual-memory work in C covering copy-on-write process memory, address-space management and dynamic heap growth.",
    stack: ["C", "OS/161", "Virtual Memory", "MIPS", "Kernel Development"],
    highlights: [
      "Implemented copy-on-write semantics for fork with shared physical pages, reference counting and write-fault handling.",
      "Added sbrk support for safe dynamic heap growth and shrinkage.",
      "Implemented mmap and munmap with demand loading, protection handling and dirty-page write-back.",
    ],
    proof: [
      "Copy-on-write avoided eager duplication of physical pages after fork.",
      "Demand faults allocated or loaded pages only when first accessed.",
      "Work required page-table, TLB, address-space and kernel syscall changes.",
    ],
    sourceAccess: "private-coursework",
  },
  {
    slug: "airbrb",
    title: "AirBrB — React Single Page Application",
    shortTitle: "AirBrB",
    period: "Sep 2025 – Dec 2025",
    kind: "coursework",
    tier: "selected",
    featuredRank: 7,
    team: "Frontend coursework project",
    summary:
      "A React single-page application modelling a short-term property-rental product against a provided backend.",
    stack: ["React", "JavaScript", "REST APIs", "SPA", "Authentication"],
    highlights: [
      "Implemented authentication, listing creation and management, bookings and reviews.",
      "Built search and filtering across dates, pricing, ratings and availability.",
      "Managed asynchronous API interactions and client-side state without full-page reloads.",
    ],
    proof: [],
    sourceAccess: "private-coursework",
  },
  {
    slug: "toohak",
    title: "Toohak — Interactive Multiplayer Quiz Platform",
    shortTitle: "Toohak",
    period: "May 2024 – Aug 2024",
    kind: "coursework",
    tier: "selected",
    featuredRank: 8,
    team: "Five-person software engineering team",
    summary:
      "A TypeScript multiplayer quiz platform with authentication, quiz administration, session workflows and automated tests.",
    stack: ["TypeScript", "Node.js", "REST APIs", "Authentication", "Jest"],
    highlights: [
      "Developed backend quiz and session workflows including authentication, game-state progression and answer validation.",
      "Worked within a shared Git-based team workflow with structured API contracts and automated testing.",
      "Implemented and tested administrative and player-facing API behaviour across the quiz lifecycle.",
    ],
    proof: [],
    sourceAccess: "private-coursework",
  },
  {
    slug: "bank-heist",
    title: "Bank Heist — Unreal Engine First-Person Shooter",
    shortTitle: "Bank Heist FPS",
    period: "Sep 2025 – Dec 2025",
    kind: "coursework",
    tier: "selected",
    featuredRank: 9,
    team: "Individual computer-graphics project",
    summary:
      "A playable first-person bank-heist scenario built in Unreal Engine with combat, enemy AI and a complete gameplay loop.",
    stack: ["Unreal Engine", "C++", "Blueprints", "Game AI"],
    highlights: [
      "Built a complete gameplay loop from level entry through combat and objective completion.",
      "Implemented movement, shooting, reloading, hit detection, enemy combat behaviour and damage handling.",
      "Added a morality system where civilian damage creates a separate failure condition.",
      "Designed the level, HUD, lighting, fog, audio and interaction feedback around the gameplay loop.",
    ],
    proof: [],
    sourceAccess: "private-coursework",
  },
];

export const homepageProjectSlugs = [
  "rupturelab",
  "nat",
  "wheat-segmentation",
  "bittrickle",
] as const;

export const homepageExperienceSlugs = [
  "armsoa",
  "tandem-learning",
  "shalom-tutor",
] as const;

export const skillGroups = [
  {
    title: "Backend & APIs",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST/OpenAPI",
      "WebSockets",
      "SQL",
      "PostgreSQL",
    ],
    evidence: ["RuptureLab", "ArmsOA", "Tandem Learning", "Toohak"],
  },
  {
    title: "Frontend & Full-stack",
    skills: ["TypeScript", "JavaScript", "React", "Next.js"],
    evidence: ["RuptureLab", "ArmsOA", "Tandem Learning", "AirBrB"],
  },
  {
    title: "Infrastructure & Quality",
    skills: [
      "Docker",
      "Git",
      "Linux",
      "CI/CD",
      "Pytest",
      "Vitest",
      "Playwright",
      "API Testing",
    ],
    evidence: ["RuptureLab", "NAT", "ArmsOA", "Tandem Learning"],
  },
  {
    title: "Data & Machine Learning",
    skills: [
      "PyTorch",
      "Pandas",
      "XGBoost",
      "Machine Learning",
      "Computer Vision",
      "Classification",
      "Regression",
    ],
    evidence: ["Wheat Crop Segmentation", "xRFM Benchmarking"],
  },
  {
    title: "Systems & Networking",
    skills: [
      "C",
      "C++",
      "Java",
      "Rust",
      "Socket Programming",
      "Multithreading",
      "Operating Systems",
    ],
    evidence: ["BitTrickle", "OS/161 Virtual Memory", "UNSW coursework"],
  },
] as const satisfies readonly SkillGroup[];

export const education = {
  institution: "UNSW Sydney",
  degree: "Bachelor of Science",
  field: "Computer Science",
  period: "Sep 2023 – Sep 2026",
  location: "Sydney, Australia",
  highlights: [
    "Completed 4 September 2026; conferral scheduled for 30 September 2026.",
    "UNSW International Student Excellence Award — merit scholarship worth AUD 8,800.",
    "UNSW Employability Award — 2026.",
    "COMP3900 Computer Science Project — 94 HD.",
  ],
} as const satisfies Education;

export const credentials = [
  {
    title: "UNSW Employability Award 2026",
    issuer: "UNSW",
    issued: "Aug 2026",
    summary:
      "Employability development and assessment covering communication, teamwork, problem solving, adaptability and professional readiness.",
  },
  {
    title: "Introduction to Programming Using Python",
    issuer: "Harvard University",
    issued: "Oct 2022",
    summary:
      "Completed Harvard CS50's Python programming course and associated problem sets and final project.",
  },
  {
    title: "Learn to Lead with UNSW 2026",
    issuer: "UNSW",
    issued: "Jun 2026",
    summary:
      "Leadership program covering human-centred leadership, stakeholder engagement, strategic thinking and collaboration.",
  },
] as const satisfies readonly Credential[];
