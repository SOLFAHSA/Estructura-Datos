


#Servidor REST - SOCKET AppTicket

========================================

Servidor REST y SOCKET para aplicación de tickets, para demostrar uso de colas.

Requisitos: 
```
npm i -g typescript
npm i -g nodemon
```

Compilar:
```
tsc -w
```

Ejecutar:
```
nodemon dist/
```

##Crear nuevo ticket
```
localhost:7200/tickets/new \*   **Agregar en el body; clienteID: ''## *\
```

##Despachar ticket
```
localhost:7200/tickets/closed
```
