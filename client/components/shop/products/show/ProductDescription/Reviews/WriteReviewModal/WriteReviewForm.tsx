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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const WriteReviewForm = ({ productID }: { productID: number }) => {
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

    const onSubmit = async (data: z.infer<typeof schema>) => {
        console.log({ data, productID })

        // submit form
        // reset form
        // close modal
        // toast on error (errors[0])
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
