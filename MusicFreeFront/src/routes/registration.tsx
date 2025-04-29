import { createFileRoute } from '@tanstack/react-router'
import {RegistrationControl} from "../RegistrationPage/RegistrationControl"
export const Route = createFileRoute('/registration')({
  component: RegistrationControl
})