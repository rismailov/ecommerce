import { AuthCard } from '@/components/auth/AuthCard'
import { ResetPasswordForm } from '@/components/auth/forms/ResetPasswordForm'

export const metadata = {
    title: 'Reset Password',
}

export default function ResetPassword() {
    return (
        <AuthCard title="Reset Password">
            <ResetPasswordForm />
        </AuthCard>
    )
}
