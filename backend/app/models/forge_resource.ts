export type ForgeResource = {
  id: number
  description: string
  name: string
  name_with_namespace: string
  path: string
  path_with_namespace: string
  created_at: string // ISO date string
  default_branch: string
  tag_list: string[]
  topics: string[]
  ssh_url_to_repo: string
  http_url_to_repo: string
  web_url: string
  readme_url: string
  forks_count: number
  avatar_url: string
  star_count: number
  last_activity_at: string // ISO date string
  namespace: Namespace
}

type Namespace = {
  id: number
  name: string
  path: string
  kind: string
  full_path: string
  parent_id: number | null
  avatar_url: string | null
  web_url: string
}
