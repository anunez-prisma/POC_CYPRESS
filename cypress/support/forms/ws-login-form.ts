import{RequestLogin} from "./request/login-request";
import{ResponseLogin} from "./response/login-response";

export function getRequestLogin(username: String, password: String, channel: Number) {
    const cardData: RequestLogin = {
        username: username,
        password: password,
        channel: channel,
        grant_type: "password", 
        scope: "openid"
    }
    return cardData
}

export function validateResponseLogin(responseLogin: ResponseLogin){
    cy.log("Iniciando validación del response de login...")
    expect(responseLogin).is.not.null
    expect(responseLogin).is.not.empty
    expect('#access_token').is.not.null
    expect('#access_token').to.be.a('string')
    cy.log("Finalizando validación del response de login...")
}   