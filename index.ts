

import Server from './classes/server';
import  ROUTER  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const SERVER = Server.instance;

// MIDDLEWARES 
SERVER.app.use( bodyParser.urlencoded({ extended: true }) );
SERVER.app.use( bodyParser.json() );

SERVER.app.use( cors({ origin: true, credentials: false }) );



SERVER.app.use('/', ROUTER);

SERVER.start( () => {
    console.log(`Servidor corriendo en el puerto: ${ SERVER.port }`);
});

/// Se supone que la extension Live share audio, es para poder hablar,
/// Prueben modificar el codigo
/// si se puede modificar 
// LISTO JULIO
//Lo del Audio dice descargando todaia
// que raro
// si raro pero hay vamos a ver si lo termina de descargar
// Será que tenes problemas con el internet
/// y por eso no te ha descargado la extension
// creo que tambien eso 
// julio una pregunta podes ver los mensajes de chat

// si


