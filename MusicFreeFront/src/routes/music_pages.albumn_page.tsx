import { createFileRoute } from '@tanstack/react-router'
import { AlbumnPage } from '../AlbumnPage/AlbumnPage'
export const Route = createFileRoute('/music_pages/albumn_page')({
  component: AlbumnPage,
})