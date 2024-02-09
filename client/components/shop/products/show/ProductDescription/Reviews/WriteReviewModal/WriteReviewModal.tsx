import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { WriteReviewForm } from './WriteReviewForm'

export const WriteReviewModal = ({
    productID,
    open,
    setOpen,
}: {
    productID: number
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { user } = useAuth({})

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>

                {user ? (
                    <WriteReviewForm productID={productID} />
                ) : (
                    <div className="flex flex-col">
                        <p className="text-muted-foreground">
                            You need to be authorized to write a review.
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                            <Button asChild>
                                <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
                            </Button>

                            <Button variant="secondary" asChild>
                                <Link href={ROUTES.AUTH.REGISTER}>
                                    Register
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
