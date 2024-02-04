import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getNameInitialsForAvatar(fullName: string): string {
    if (fullName.split(' ').length == 1) {
        return 'TT'
    }

    return fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
}

export function sleep(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function toTitleCase(value: string) {
    return value.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    })
}
