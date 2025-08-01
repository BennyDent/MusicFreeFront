import { createFileRoute } from '@tanstack/react-router'
import { MusicianCreate } from '../AuthorandAlndGenreTagsCreate/MusicianCreate'
export const Route = createFileRoute('/author_create')({
  component: MusicianCreate
})