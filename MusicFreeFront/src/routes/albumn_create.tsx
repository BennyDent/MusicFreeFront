import { createFileRoute } from '@tanstack/react-router'
import { AlbumnUploadTemplate } from '../AlbumnCreate/AlbumnCreateTemplate'

export const Route = createFileRoute('/albumn_create')({
  component:  AlbumnUploadTemplate
})