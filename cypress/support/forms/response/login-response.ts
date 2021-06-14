export interface ResponseLogin {
    access_token: String,
    token_type: String,
    refresh_token: String,
    expires_in: Number,
    scope: String,
    AutenticarResponse: AutenticarResponse
}

export interface AutenticarResponse {
    APIKey: String,
    mensajesAdicionales: [Object],
    funciones: [String],
    sessionid: String,
    parametros: parametros
}

export interface parametros {
    botonAuthPerfil: Object,
    botonAuthUltimaModificacionPassword: Number,
    botonAuthUsername: String,
    botonAuthTipoCuentaId: Number,
    channel: Number,
    botonAuthUltimaPassword: Number,
    botonAuthHashCuenta: Object,
    botonAuthIpUltimoLogin: String,
    botonAuthPuedeOperar: Boolean,
    botonAuthIntentosLogin: Number,
    botonAuthPreguntaSeguridad_id: Number,
    botonAuthTipoUsuarioId: Number,
    botonAuthDenominacion1: String,
    botonAuthDenominacion2: String,
    botonAuthVersion: Number,
    botonAuthRespuestaPreguntaSeguridad: String,
    botonAuthTipoCuenta: String,
    botonAuthId: Number,
    botonAuthFechaUltimoLogin: Number,
    banco: Object,
    botonAuthCuentaId: String,
    botonAuthUsuarioModificacion: String,
    botonAuthFiscalDocStatusDesc: String,
    botonAuthPasswordBloqueada: Boolean,
    botonAuthFechaModificacion: Number
}