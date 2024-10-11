export type Resource = {
  id: number
  title: string
  lastUpdated: Date
  author: string
  source: Source
  description?: string | null
  link?: string
  tags?: Tag[]
}

export type Tag = string

export enum Source {
  ELAASTIC = 'elaastic',
  FORGE = 'forge',
}
