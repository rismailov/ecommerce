import { AuthCard } from '@/components/auth/AuthCard'
import { AuthSessionStatus } from '@/components/auth/AuthSessionStatus'
import { ForgotPasswordForm } from '@/components/auth/forms/ForgotPasswordForm'
import { Suspense } from 'react'

export const metadata = {
    title: 'Reset Password',
}

export default function ForgotPassword() {
    return (
        <AuthCard
            title="Reset Password"
            description="Enter your email address and we will email you a password reset link."
        >
            <Suspense fallback={<></>}>
                <AuthSessionStatus page="forgot-password" />
            </Suspense>

            <ForgotPasswordForm />
        </AuthCard>
    )
}
