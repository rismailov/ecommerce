import tailwindTheme from '@/lib/tailwind-theme'
import {
    RatingProps,
    Rating as ReactRating,
    Star,
} from '@smastrom/react-rating'

const itemStyles = {
    activeFillColor: tailwindTheme.theme.colors.foreground,
    inactiveFillColor: tailwindTheme.theme.colors.secondary.DEFAULT,
    itemShapes: Star,
}

export const Rating = (props: RatingProps) => {
    return <ReactRating {...props} itemStyles={itemStyles} />
}
