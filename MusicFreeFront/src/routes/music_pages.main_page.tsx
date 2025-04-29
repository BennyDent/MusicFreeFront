import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../MainPage/MainPageTemplate'
export const Route = createFileRoute('/music_pages/main_page')({
  component: MainPage,
})