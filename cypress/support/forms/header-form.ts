import {Header} from "./header/generic-header";

//Validar si esto es parametrizable o generico
export function getHeader() {
    const header: Header = {
        'content-type': 'application/json', //TODO: Mandarlo a env
        'Authorization': 'Basic YWNtZTphY21lc2VjcmV0' //TODO: Mandarlo a env
    }
    return header
}