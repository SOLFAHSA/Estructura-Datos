"use strict";
exports.__esModule = true;
exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuarioConectado = void 0;
var usuarios_lista_1 = require("../classes/usuarios-lista");
var usuario_1 = require("../classes/usuario");
exports.usuarioConectado = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = function (cliente) {
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuarioConectado.agregar(usuario);
};
exports.desconectar = function (cliente) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
        exports.usuarioConectado.borrarUsuario(cliente.id);
    });
};
exports.mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuarioConectado.actualiazarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: "Usuario " + payload.nombre + ", configurado"
        });
    });
};
