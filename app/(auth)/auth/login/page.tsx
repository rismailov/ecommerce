import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'

export default function Page() {
    return (
        <AuthCard title="Login" description="Log into your account.">
            <LoginForm />
        </AuthCard>
    )
}
