import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/author_page')({
  component: () => <div>Hello /author_page!</div>
})