
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'; 
import http from 'http';
import * as socket from '../sockets/socket'; 

export default class Server {

    private static _instance: Server;
    
    public app = express.application;
    public port: number;
    public io: socketIO.Server;

    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port =  SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.socketsListen();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private socketsListen() {

        console.log('Escuchando sockets...');

        this.io.on('connection', cliente => {
          
            socket.conectarCliente( cliente );          

            socket.desconectar(cliente);
            socket.mensaje(cliente, this.io);
            socket.configurarUsuario(cliente, this.io );
        })



    }

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback() );
    }

}