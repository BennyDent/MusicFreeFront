import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '../LoginComponent'
export const Route = createFileRoute('/login')({
  component: LoginComponent
})