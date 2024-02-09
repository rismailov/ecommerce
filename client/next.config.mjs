/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_BACKEND_URL.replace(
                    'https://',
                    '',
                ),
                pathname: '/storage/images/**',
            },
        ],
    },
}

export default nextConfig
