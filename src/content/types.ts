export type InternalHref = `/${string}`;
export type HttpsUrl = `https://${string}`;

export interface NavigationItem {
  label: string;
  href: InternalHref;
}

export type ExperienceCategory = "engineering" | "education" | "leadership";

export interface Experience {
  slug: string;
  role: string;
  organisation: string;
  location: string;
  period: string;
  category: ExperienceCategory;
  isCurrent: boolean;
  summary: string;
  highlights: readonly string[];
  stack?: readonly string[];
}

export type ProjectTier = "flagship" | "featured" | "selected";
export type ProjectKind = "independent" | "industry" | "coursework";
export type SourceAccess = "public" | "private-coursework" | "private-client";

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  period: string;
  kind: ProjectKind;
  tier: ProjectTier;
  featuredRank: number;
  team: string;
  summary: string;
  stack: readonly string[];
  highlights: readonly string[];
  proof: readonly string[];
  sourceAccess: SourceAccess;
  repoUrl?: HttpsUrl;
  caseStudyHref?: InternalHref;
}

export interface SkillGroup {
  title: string;
  skills: readonly string[];
  evidence: readonly string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  highlights: readonly string[];
}

export interface Credential {
  title: string;
  issuer: string;
  issued: string;
  summary: string;
}
