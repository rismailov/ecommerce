import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/lib/routes'
import { IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'

export const CheckoutForm = () => {
    return (
        <Card className="w-full">
            <CardContent className="py-6">
                {/* contact */}
                <div className="flex flex-col space-y-2.5">
                    <p className="text-lg font-semibold">Contact</p>

                    <div className="flex flex-col space-y-4">
                        <Input placeholder="E-mail or phone number" />

                        <Checkbox
                            id="newsletter"
                            label="E-mail me with news and letters"
                        />
                    </div>
                </div>

                {/* shipping */}
                <div className="mt-10 flex flex-col">
                    <p className="text-lg font-semibold">Shipping Address</p>

                    <div className="mt-2.5 flex flex-col space-y-4">
                        <div className="flex items-center space-x-3">
                            <Input className="w-1/2" placeholder="First name" />

                            <Input className="w-1/2" placeholder="Last name" />
                        </div>

                        <Input placeholder="Address" />
                        <Input placeholder="Apartment, suite" />

                        <div className="flex items-center space-x-3">
                            <Input className="w-1/3" placeholder="City" />
                            <Input className="w-1/3" placeholder="State" />
                            <Input className="w-1/3" placeholder="ZIP Code" />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center space-x-4 justify-between">
                        <Button
                            variant="link"
                            className="text-primary-text"
                            asChild
                        >
                            <Link href={ROUTES.SHOP.INDEX}>
                                <IconChevronLeft className="w-5 h-5 mr-1" />

                                <span className="font-medium">
                                    Continue shopping
                                </span>
                            </Link>
                        </Button>

                        <Button className="rounded-full px-5">
                            Pay with Stripe
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
