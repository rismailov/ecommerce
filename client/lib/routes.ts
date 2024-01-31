const AUTH_PREFIX = '/auth'

export const ROUTES = {
    APP: {
        INDEX: '/',
    },

    AUTH: {
        LOGIN: `${AUTH_PREFIX}/login`,
        REGISTER: `${AUTH_PREFIX}/register`,
        FORGOT_PASSWORD: `${AUTH_PREFIX}/forgot-password`,
    },

    DASHBOARD: {
        INDEX: '/dashboard',
    },
}
