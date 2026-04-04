// Shared utilities across all sites

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)

export const truncate = (str: string, length: number): string =>
  str.length > length ? `${str.slice(0, length)}...` : str

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export type SeoMetadata = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}
