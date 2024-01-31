import { type ClassValue, clsx } from 'clsx'
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
