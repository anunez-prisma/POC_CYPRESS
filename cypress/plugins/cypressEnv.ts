import * as cypress from '../../cypress.json'
import * as cypressQa from '../../cypress-qa.json'

export const cypressEnv = {
    get(name: string) {
        switch (process.env["NODE_ENV"].trim()) {
            case "qa": {
                return cypressQa.env[name]
            }
            default: {
                return cypress.env[name]
            }
        }
    }
}