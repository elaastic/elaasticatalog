// Define FormLevel type
export type FormLevel = {
  value: string;
  label: string;
};

// LEVELS array with correct typing
export const LEVELS: FormLevel[] = [
  { value: "primaire", label: "Primaire" },
  { value: "college", label: "Collège" },
  { value: "lycee", label: "Lycée" },
  { value: "superieur", label: "Supérieur" },
];

// subjects array with constant assertion
export const SUBJECTS = [
  "Maths",
  "Français",
  "Histoire",
  "Géographie",
  "Physique",
  "Chimie",
  "SVT",
  "Technologie",
] as const;

// Define types for Level and Subject
export type Level = (typeof LEVELS)[number]["label"];
export type Subject = (typeof SUBJECTS)[number];

// Tag type as a union of Subject and Level
export type Tag = string;

// Mapping Subject to icon classes
export const subjectIcons: Record<Subject, string> = {
  Maths: "i-heroicons-calculator",
  Français: "i-heroicons-book-open",
  Histoire: "i-mdi-crown-outline",
  Géographie: "i-heroicons-globe-europe-africa-20-solid",
  Physique: "i-mdi-magnet-on",
  Chimie: "i-heroicons-beaker",
  SVT: "i-mdi-leaf",
  Technologie: "i-heroicons-cog",
};

export type GitLabProject = {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string; // ISO date string
  default_branch: string;
  tag_list: string[];
  topics: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  forks_count: number;
  avatar_url: string;
  star_count: number;
  last_activity_at: string; // ISO date string
  namespace: Namespace;
};

type Namespace = {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id: number | null;
  avatar_url: string | null;
  web_url: string;
};

export type Resource = {
  id: number;
  title: string;
  description: string;
  lastUpdated: Date;
  author: string;
  link?: string;
  tags?: Tag[];
  source: Source;
};

export enum Source {
  ELAASTIC = "elaastic",
  FORGE = "forge",
}
