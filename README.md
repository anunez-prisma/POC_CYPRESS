# Cypress BAT-FRAMEWORK

### Resumen

Este proyecto contiene los escenarios de pruebas para los WS de PRISMA. Tiene 
como objetivo ofrecer una forma sencilla de realizar pruebas automatizadas que 
requieran todo el sistema en funcionamiento y comprueba sus requisitos a fondo.

### Requisitos

Recomendamos tener instalado:

* [NodeJS] (https://nodejs.org/en/download/) ya que este es un nodo
proyecto.

### Instalación

Cypress es un framework impulsado por el motor NPM. Solo se requiere ejecitar el
siguiente comando:

`npm install`

### Ejecución

Ahora, realizados todos los pasos anteriores, podemos ejecutar las pruebas de dos formas:

1.- Con interfaz: Cyprees provee una interfaz para ejecutar de manera personalizada los scripts
del proyecto. Es posible seleccionar un script especifico y la plataforma en donde este se desemvolvera.
Este tipo de ejecuón no genera reportes. Para la ejecución con interfaz se requiere el siguiente comando:

`npm run start`
`npm run start-qa`
`...`

2.- Sin interfaz: No se levantara la UI de cypress pero se ejecutara el batch completo de pruebas desarrolladas

`npm run start-qa-report`
`...`

Nota: los comandos contiene las varibales por ambiente. Considerelo al seleccionar el comando a ejecutar.

Se puede generar el reporte unificado de las pruebas con el comando `npm run report` el cual se generara
un html `output.html`.

### Estructura del proyecto

```
├── cypress
│   ├── fixtures
│   │   ├── # fixture data
│   ├── integration
│   │   ├── # Todos los scrips de pruebas
│   ├── plugins # Librerias y plugins de NodeJS
│   │   ├── database # Librerias para consumir base de datos
│   │   │   └── mongoDB.ts
│   │   └── index.ts
│   ├── support
│   │   ├── forms #Estructuras que conforman un tipo de dato o componente
│   │   │   ├── # Forms data
│   │   │   └── **.ts
│   │   |   └── header
│   │   |       ├── generic-header.ts
|   │   |       └── **.ts
│   │   |   └── request
│   │   |       ├── login-request.ts
|   │   |       └── **.ts
│   │   |   └── response
│   │   |       ├── login-response.ts
|   │   |       └── **.ts
│   │   ├── commands.ts
│   │   └── index.ts
├── cypress-qa.json # Ambiente de QA
├── cypress.json # Ambiente local
└── reporter-config.json # Configuración del reporte
```