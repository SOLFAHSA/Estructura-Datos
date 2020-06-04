"use strict";
exports.__esModule = true;
exports.TicketService = void 0;
var dataManager_1 = require("../classes/dataManager");
var TicketService = /** @class */ (function () {
    function TicketService() {
        this.db = dataManager_1.DataManager.instance.db;
    }
    Object.defineProperty(TicketService, "instance", {
        get: function () {
            return this._TicketService || (this._TicketService = new TicketService());
        },
        enumerable: false,
        configurable: true
    });
    TicketService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.all('select * from ticket', function (error, tickets) {
                if (error) {
                    reject(error);
                }
                resolve(tickets);
            });
        });
    };
    TicketService.prototype.getById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.get('select * from ticket where id = ?', id, function (error, ticket) {
                if (error) {
                    reject(error);
                }
                resolve(ticket);
            });
        });
    };
    TicketService.prototype.add = function (ticket) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (ticket) {
                var stm_1 = _this.db.prepare('insert into ticket VALUES(?,?,?)')
                    .run([ticket.numero, ticket.clienteID, 0], function (err) {
                    if (err) {
                        reject({ error: err.message });
                    }
                    resolve(stm_1);
                });
            }
            else {
                reject({ ok: false, status: 400, error: 'Se recibio un valor NULL' });
            }
        });
    };
    TicketService.prototype.update = function (ticket) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (ticket) {
                var stmt_1;
                stmt_1 = _this.db.prepare("UPDATE ticket\n                      SET\n                        clienteId = " + ticket.clienteID + ",\n                        status = " + ticket.status + "\n                      where\n                        numero = " + ticket.numero + ";").run(function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve(stmt_1);
                });
            }
        });
    };
    TicketService.prototype["delete"] = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stmt = _this.db.prepare('Delete from ticket where numero=?')
                .run(id, function (err) {
                if (err)
                    reject({ error: err.message });
                else
                    resolve(stmt);
            });
        });
    };
    TicketService.prototype.despacharTicket = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.get('select min(numero) as numero, clienteID, status from ticket where status = 0', function (error, ticket) {
                if (error) {
                    reject(error);
                }
                resolve(ticket);
            });
        });
    };
    TicketService.prototype.nuevoTicket = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.get('SELECT max(numero) as numero FROM ticket t;', function (err, result) {
                if (err) {
                    reject(err.message);
                }
                if (result.numero === null) {
                    resolve(1);
                }
                else {
                    resolve((result.numero + 1));
                }
            });
        });
    };
    return TicketService;
}());
exports.TicketService = TicketService;
