"use strict";
exports.__esModule = true;
exports.UsuariosLista = void 0;
var UsuariosLista = /** @class */ (function () {
    function UsuariosLista() {
        this.lista = [];
    }
    UsuariosLista.prototype.agregar = function (usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    };
    UsuariosLista.prototype.actualiazarNombre = function (id, nombre) {
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('=====Actualizando usuario=====');
        console.log(this.lista);
    };
    UsuariosLista.prototype.getLista = function () {
        return this.lista;
    };
    UsuariosLista.prototype.getUsuario = function (id) {
        return this.lista.find(function (usuario) { return usuario.id === id; });
    };
    UsuariosLista.prototype.getUsuariosEnSala = function (sala) {
        return this.lista.filter(function (usuario) { return usuario.sala === sala; });
    };
    UsuariosLista.prototype.borrarUsuario = function (id) {
        var TEMP_USUARIO = this.getUsuario(id);
        this.lista = this.lista.filter(function (usuario) { return usuario.id !== id; });
        return TEMP_USUARIO;
    };
    return UsuariosLista;
}());
exports.UsuariosLista = UsuariosLista;
