import { Header } from '@/components/Header/Header'
import { fontSans } from '@/components/font'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'NikeCommerce',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />

                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    )
}