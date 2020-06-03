import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuarioConectado = new UsuariosLista();


export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuarioConectado.agregar(usuario);

};


export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioConectado.borrarUsuario(cliente.id);
    });

};

export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('mensaje', ( payload ) => {
        console.log('Mensaje recibido', payload);
   
        io.emit('mensaje-nuevo', payload );
   
    });

};

export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
       
        usuarioConectado.actualiazarNombre( cliente.id, payload.nombre )

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`,
        });

    });

};

