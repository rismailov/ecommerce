import { Button } from './ui/button'

export const Footer = () => {
    return (
        <footer className="mt-14 bg-card border-t">
            <div className="container py-8 flex items-center justify-center text-muted-foreground">
                <p className="text-center">
                    Shop by{' '}
                    <Button variant="link" asChild>
                        <a
                            href="https://github.com/rismailov"
                            className="!text-base text-foreground"
                        >
                            rismailov
                        </a>
                    </Button>
                    . All product images taken from{' '}
                    <Button variant="link" asChild>
                        <a
                            href="https://nike.com"
                            className="!text-base text-foreground"
                        >
                            Nike.com
                        </a>
                    </Button>
                    .
                </p>
            </div>
        </footer>
    )
}
