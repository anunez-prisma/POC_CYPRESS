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

'npm install'

### Ejecución

Ahora, realizados todos los pasos anteriores, podemos ejecutar las pruebas de dos formas:

1.- Con interfaz: Cyprees provee una interfaz para ejecutar de manera personalizada los scripts
del proyecto. Es posible seleccionar un script especifico y la plataforma en donde este se desemvolvera.
Para la ejecución con interfaz se requiere el siguiente comando:

'npm run start'
'npm run start-qa'
...

Nota: los comandos contiene las varibales por ambiente. Considerelo al seleccionar el comando a ejecutar