import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/music_pages/author_page')({
  component: () => <div>Hello /author_page!</div>
})