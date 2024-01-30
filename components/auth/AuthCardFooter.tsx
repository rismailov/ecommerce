import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthCardFooter({
    isLoginPage,
}: {
    isLoginPage: boolean
}) {
    return (
        <CardFooter className="flex items-center justify-center space-x-1">
            <span className="text-muted-foreground">
                {isLoginPage
                    ? "Don't have an account?"
                    : 'Already have an account?'}
            </span>

            <Button
                variant="link"
                asChild
                className="text-base font-medium no-underline hover:underline text-brand"
            >
                <Link href={isLoginPage ? '/auth/register' : '/auth/login'}>
                    {isLoginPage ? 'Sign up' : 'Sign in'}
                </Link>
            </Button>
        </CardFooter>
    )
}
