'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconCheck } from '@tabler/icons-react'
import { Label } from './label'

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: string
    /**
     * Making id required so that checkbox is checked when label clicked.
     *
     * In shadcn <Form /> this is done automatically using <FormLabel /> component, but
     * in this project checkboxes used more oftenly outside of forms.
     */
    id?: string
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, label, ...props }, ref) => (
    <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer h-[18px] w-[18px] shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('flex items-center justify-center text-current')}
            >
                <IconCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
            <Label {...(props.id && { htmlFor: props.id })}>{label}</Label>
        )}
    </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
