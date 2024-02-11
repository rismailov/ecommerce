import { Rating } from '@/components/common/Rating'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RQ_REVIEWS_KEY } from '@/constants'
import axios from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const WriteReviewForm = ({
    productID,
    closeModal,
}: {
    productID: number
    closeModal: () => void
}) => {
    const queryClient = useQueryClient()

    const schema = z.object({
        title: z.string().min(2, 'Title must have at least 2 characters.'),
        text: z.string().min(2, 'Text must have at least 2 characters.'),
        stars: z.number().min(1, 'Please rate this product.').max(5),
    })

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            text: '',
            stars: 0,
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: ({
            productID,
            data,
        }: {
            productID: number
            data: z.infer<typeof schema>
        }): Promise<{ message: string }> =>
            axios.post(`/reviews/${productID}`, data),
        meta: { setError: form.setError },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RQ_REVIEWS_KEY],
            })
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            const { message } = await mutateAsync({ productID, data })

            form.reset()
            closeModal()
            toast(message)
        } catch (error) {
            if (isAxiosError(error) && error.response?.data.message) {
                toast(error.response.data.message)
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                data-submitting={form.formState.isSubmitting}
            >
                <div className="flex flex-col space-y-5">
                    {/* rate with stars */}
                    <FormField
                        control={form.control}
                        name="stars"
                        render={({ field }) => (
                            <FormItem>
                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={field.value}
                                    onChange={field.onChange}
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Review title</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Enter review title"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* text */}
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Review text</FormLabel>

                                <FormControl>
                                    <Textarea
                                        placeholder="Enter review text"
                                        className="resize-none"
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        isLoading={form.formState.isSubmitting}
                        className="self-start"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}
