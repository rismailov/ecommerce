import { Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-sans',
})
