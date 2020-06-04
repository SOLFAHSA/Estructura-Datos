"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express_1 = require("express");
var server_1 = require("../classes/server");
var ticketService_1 = require("../services/ticketService");
var ticket_1 = require("../classes/ticket");
var ROUTER = express_1.Router();
var ticketService = ticketService_1.TicketService.instance;
ROUTER.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!'
    });
});
ROUTER.post('/mensajes', function (req, res) {
    var CUERPO = req.body.cuerpo;
    var DE = req.body.de;
    var PAYLOAD = {
        de: DE,
        cuerpo: CUERPO
    };
    var SERVER = server_1["default"].instance;
    SERVER.io.emit('mensaje-nuevo', PAYLOAD);
    res.json({
        ok: true,
        cuerpo: CUERPO,
        de: DE
    });
});
ROUTER.post('/mensajes/:id', function (req, res) {
    var PRM = req.params.id;
    var CUERPO = req.body.cuerpo;
    var DE = req.body.de;
    var PAYLOAD = {
        de: DE,
        cuerpo: CUERPO
    };
    var SERVER = server_1["default"].instance;
    SERVER.io["in"](PRM).emit('mensaje-privado', PAYLOAD);
    res.json({
        ok: true,
        cuerpo: CUERPO,
        de: DE,
        parametros: PRM
    });
});
ROUTER.post('/tickets/new', function (req, res) {
    var SERVER = server_1["default"].instance;
    var ticket = req.body;
    ticketService.nuevoTicket()
        .then(function (result) {
        var NUM = result;
        var newTicket = new ticket_1.Ticket(NUM);
        newTicket.clienteID = ticket.clienteID;
        ticketService.add(newTicket)
            .then(function (result) {
            console.log(result);
            res.json({
                ok: true,
                ticket: result
            });
        });
    });
});
ROUTER.post('/tickets/closed', function (req, res) {
    var SERVER = server_1["default"].instance;
    ticketService.despacharTicket()
        .then(function (result) {
        var ticketUpd = __assign({}, result);
        ticketUpd.status = 1;
        ticketService.update(ticketUpd)
            .then(function (result) {
            console.log(result);
            res.json({
                ok: true,
                ticket: ticketUpd
            });
        });
    });
});
exports["default"] = ROUTER;
