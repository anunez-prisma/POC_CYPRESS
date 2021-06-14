import './commands.ts'

export const WS_GATEWAY = Cypress.env('WS_GATEWAY')
export const URL_MONGODB_CONNECTION = Cypress.env('MONGODB_URL')

//Example
export const PORTAL_GATEWAY = Cypress.env('PORTAL_GATEWAY')

export const WS_ENDPOINTS = {
    WS_ENDPOINT_LOGIN: WS_GATEWAY + Cypress.env('WS_ENDPOINT_LOGIN')
}

//Example
export const PORTAL_ENDPOINTS = {
    PORTAL_EDPOINT_LOGIN: PORTAL_GATEWAY + Cypress.env('PORTAL_EDPOINT_LOGIN')
}