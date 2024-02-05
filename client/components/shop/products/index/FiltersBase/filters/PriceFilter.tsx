import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import useFiltersStore from '@/store/filters.store'
import { IconCurrencyDollar } from '@tabler/icons-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDebounce } from 'react-use'

export const PriceFilter = () => {
    const price = useFiltersStore((s) => s.price)
    const setPrice = useFiltersStore((s) => s.setPrice)

    // min price
    const [priceMin, setPriceMin] = useState<string | number>('')
    useDebounce(() => setPrice({ ...price, min: priceMin }), 500, [priceMin])

    // max price
    const [priceMax, setPriceMax] = useState<string | number>('')
    useDebounce(() => setPrice({ ...price, max: priceMax }), 500, [priceMax])

    return (
        <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-3">
                    {/* on sale */}
                    <Checkbox
                        id="sale"
                        label="On sale"
                        value="0"
                        checked={price.onSale}
                        onCheckedChange={(checked: boolean) =>
                            setPrice({ ...price, onSale: checked })
                        }
                    />

                    {/* price range */}
                    <div className="flex items-center space-x-3 pr-1">
                        {/* min price */}
                        <div className="flex items-center space-x-1">
                            <IconCurrencyDollar className="sprite sprite-md" />

                            <NumericFormat
                                value={priceMin}
                                onValueChange={({ value }) =>
                                    setPriceMin(value)
                                }
                                decimalScale={0}
                                customInput={Input}
                                placeholder="min"
                                allowNegative={false}
                                className="h-8"
                            />
                        </div>

                        <p className="opacity-30">—</p>

                        {/* max price */}
                        <div className="flex items-center space-x-1">
                            <IconCurrencyDollar className="sprite sprite-md" />

                            <NumericFormat
                                value={priceMax}
                                onValueChange={({ value }) =>
                                    setPriceMax(value)
                                }
                                decimalScale={0}
                                customInput={Input}
                                placeholder="max"
                                allowNegative={false}
                                className="h-8"
                            />
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
