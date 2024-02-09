const AUTH_PREFIX = '/auth'
const SHOP_PREFIX = '/shop'

export const ROUTES = {
    APP: {
        INDEX: '/',
    },

    SHOP: {
        INDEX: `${SHOP_PREFIX}/`,
    },

    AUTH: {
        LOGIN: `${AUTH_PREFIX}/login`,
        REGISTER: `${AUTH_PREFIX}/register`,
        FORGOT_PASSWORD: `${AUTH_PREFIX}/forgot-password`,
    },

    DASHBOARD: {
        SETTINGS: {
            PROFILE: '/settings/profile',
            PASSWORD: '/settings/password',
            ACCOUNT: '/settings/account',
        },
    },
}
