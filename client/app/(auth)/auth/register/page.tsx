import { AuthCard } from '@/components/auth/AuthCard'
import { RegisterForm } from '@/components/auth/forms/RegisterForm'

export default function Register() {
    return (
        <AuthCard title="Sign Up" description="Create a new account.">
            <RegisterForm />
        </AuthCard>
    )
}
