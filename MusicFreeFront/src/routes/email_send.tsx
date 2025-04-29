import { createFileRoute } from '@tanstack/react-router'
import { EmailSend } from '../PasswordChangePage.tsx/EmailSend'
export const Route = createFileRoute('/email_send')({
  component: EmailSend
})