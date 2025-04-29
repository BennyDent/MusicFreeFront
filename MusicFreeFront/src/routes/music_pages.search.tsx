import { createFileRoute } from '@tanstack/react-router'
import { SearchPageTemplate } from '../SearcgPage/SearchPageTemplate'

export const Route = createFileRoute('/music_pages/search')({
  component: SearchPageTemplate
})