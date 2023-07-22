import { useQuery } from '@tanstack/react-query'

type SearchResults = {
  questions: {
    title: string
    id: string
  }[]
  posts: {
    title: string
    slug: string
  }[]
}

async function fetchSearchResults(
  term: string,
  signal: AbortSignal | undefined
): Promise<SearchResults> {
  const res = await fetch(`/api/search?term=${term}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })
  const result = await res.json()
  return result
}

export function useSearch(term: string) {
  return useQuery<unknown, Error, SearchResults>({
    queryKey: ['searchResults', { term }],
    queryFn: ({ signal }) => fetchSearchResults(term, signal),
    enabled: Boolean(term),
  })
}
