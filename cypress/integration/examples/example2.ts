import { HttpVerbs } from "../../support/enums/HttpVerbs";
import { WS_ENDPOINTS, URL_MONGODB_CONNECTION } from "../../support/index";
import { getRequestLogin, validateResponseLogin } from "../../support/forms/ws-login-form";
import { getHeader } from "../../support/forms/header-form"
import { ResponseLogin } from "../../support/forms/response/login-response";

describe('Example api test exp',function(){
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

    it('Login WS 0', function(){
        cy.log("--------- Inicio Test " + prep[0].idTest + " ---------");
        cy.request({
            'method': HttpVerbs.POST, 
            'url': WS_ENDPOINTS.WS_ENDPOINT_LOGIN,
            'body': getRequestLogin(prep[0].user, prep[0].password, prep[0].channel),
            'headers': getHeader(),
            'failOnStatusCode': false
        }).then(function(resp){
            validateResponseLogin(resp as unknown as ResponseLogin);
        });
        cy.log("--------- Fin Test " + prep[0].idTest + " ---------");
    });

    it('Login WS 1', function(){
        cy.log("--------- Inicio Test " + prep[1].idTest + " ---------");
        cy.request({
            'method': HttpVerbs.POST, 
            'url': WS_ENDPOINTS.WS_ENDPOINT_LOGIN,
            'body': getRequestLogin(prep[1].user, prep[1].password, prep[1].channel),
            'headers': getHeader(),
            'failOnStatusCode': false
        }).then(function(resp){
            validateResponseLogin(resp as unknown as ResponseLogin);
        });
        cy.log("--------- Fin Test " + prep[1].idTest + " ---------");
    });
});