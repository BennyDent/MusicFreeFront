import { createFileRoute } from '@tanstack/react-router'
import { FullPageSearch } from '../SearcgPage/FullSearchPage'

export const Route = createFileRoute('/music_pages/search_full_page')({
  component: FullPageSearch
})