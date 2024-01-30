import { AuthCard } from '@/components/auth/AuthCard'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function Register() {
    return (
        <AuthCard title="Sign Up" description="Create a new account.">
            <RegisterForm />
        </AuthCard>
    )
}
