import { AuthCard } from '@/components/auth/AuthCard'
import { AuthSessionStatus } from '@/components/auth/AuthSessionStatus'
import { LoginForm } from '@/components/auth/forms/LoginForm'
import { Suspense } from 'react'

export default function Page() {
    return (
        <AuthCard title="Login" description="Log into your account.">
            <Suspense fallback={<></>}>
                <AuthSessionStatus page="login" />
            </Suspense>

            <LoginForm />
        </AuthCard>
    )
}
