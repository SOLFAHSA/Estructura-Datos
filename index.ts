

import Server from './classes/server';
import  ROUTER  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
import { EscritorioService } from './services/escritorioService';
import { Escritorio } from './classes/escritorio';

const SERVER = Server.instance;
const ES = EscritorioService.instance;

// MIDDLEWARES 
SERVER.app.use( bodyParser.urlencoded({ extended: true }) );
SERVER.app.use( bodyParser.json() );

SERVER.app.use( cors({ origin: true, credentials: false }) );



SERVER.app.use('/', ROUTER);

SERVER.start( () => {
    console.log(`Servidor corriendo en el puerto: ${ SERVER.port }`);
});