import { HttpVerbs } from "../../support/enums/HttpVerbs";
import { WS_ENDPOINTS, URL_MONGODB_CONNECTION } from "../../support/index"
import { getRequestLogin, validateResponseLogin } from "../../support/forms/ws-login-form"
import { getHeader } from "../../support/forms/header-form"
import { ResponseLogin } from "../../support/forms/response/login-response";

describe('Example api test',function(){
    let prep;
    before(() => {
        cy.log("--------- Inicio Consulta de MongoDB ---------");
        cy.task('getMongoDBData', {
                url_connection: URL_MONGODB_CONNECTION, 
                database: 'AT-WebServices', 
                collection: 'login', 
                filter: {identificador: "Parametros"} }).then(result => {
            prep = result;
            cy.log("--------- Fin Consulta de MongoDB ---------");
        });
    });
    it('Login WS', function(){
        prep.forEach(element => {
            cy.log("--------- Inicio Test " + element.idTest + " ---------");
            cy.request({
                'method': HttpVerbs.POST, 
                'url': WS_ENDPOINTS.WS_ENDPOINT_LOGIN,
                'body': getRequestLogin(element.user, element.password, element.channel),
                'headers': getHeader(),
                'failOnStatusCode': false
            }).then(function(resp){
                validateResponseLogin(resp as unknown as ResponseLogin);
            });
            cy.log("--------- Fin Test " + element.idTest + " ---------");
        });
    });

    /*it('Suite de pruebas 2', function(){
        cy.visit('https://www.google.com');
        cy.screenshot();
        //cy.get('input[name="q"]').type('remarkablemark{enter}');
        //cy.get('input[value="Google Search"]').first().click();
        cy.get('input[name="q"]').type('remarkablemark');
        cy.get('form').submit();
        cy.screenshot()
    });*/
});