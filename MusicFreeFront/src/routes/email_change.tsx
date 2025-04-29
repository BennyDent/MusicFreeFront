import { createFileRoute } from '@tanstack/react-router'
import { PasswordSubmit } from '../PasswordChangePage.tsx/PasswordChangeTemplate'
export const Route = createFileRoute('/email_change')({
  component: PasswordSubmit
})