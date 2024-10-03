import { createFileRoute } from '@tanstack/react-router'
import { SongUploadTemplate } from '../SongUpload/SongUploadTemplate'
export const Route = createFileRoute('/song_upload')({
  component: SongUploadTemplate
})