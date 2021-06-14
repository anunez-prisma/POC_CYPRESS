import { validateResponseLogin, getRequestLogin } from "./forms/ws-login-form";
import { getHeader } from "./forms/header-form"
import { RequestLogin } from "./forms/request/login-request";
import { ResponseLogin } from "./forms/response/login-response";

declare global {
    namespace Cypress {
        /**
         * This is the interface that Cypress provides to compose the statements that allow to interact with the framework and
         * declare what the tests should do.
         */
        interface Chainable {
			//getRequestLogin(username: String, password: String, channel: Number)
		}
	}
}

//Cypress.Commands.add("validateResponseLogin", validateResponseLogin);
//Cypress.Commands.add("getRequestLogin", getRequestLogin);
//Cypress.Commands.add("getHeader", getHeader);