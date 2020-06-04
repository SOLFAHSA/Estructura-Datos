"use strict";
exports.__esModule = true;
exports.EscritorioService = void 0;
var dataManager_1 = require("../classes/dataManager");
var EscritorioService = /** @class */ (function () {
    function EscritorioService() {
        this.db = dataManager_1.DataManager.instance.db;
    }
    Object.defineProperty(EscritorioService, "instance", {
        get: function () {
            return this._EscritorioService || (this._EscritorioService = new EscritorioService());
        },
        enumerable: false,
        configurable: true
    });
    EscritorioService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.all('select * from escritorio', function (error, escritorios) {
                if (error) {
                    reject(error);
                }
                resolve(escritorios);
            });
        });
    };
    EscritorioService.prototype.getById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.get('select * from escritorio where numero = ?', id, function (error, escritorio) {
                if (error) {
                    reject(error);
                }
                resolve(escritorio);
            });
        });
    };
    EscritorioService.prototype.add = function (escritorio) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (escritorio) {
                var stm_1 = _this.db.prepare('insert into escritorio VALUES(?,?,?)')
                    .run([escritorio.numero, escritorio.descripcion, escritorio.tipo], function (err) {
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
    EscritorioService.prototype.update = function (escritorio) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (escritorio) {
                var stmt_1;
                stmt_1 = _this.db.prepare("UPDATE escritorio\n                      SET\n                        descripcion = " + escritorio.descripcion + ",\n                        tipo = " + escritorio.tipo + "\n                      where\n                        numero = " + escritorio.numero + ";").run(function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve(stmt_1);
                });
            }
            reject({ error: 'error' });
        });
    };
    EscritorioService.prototype["delete"] = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stmt = _this.db.prepare('Delete from escritorio where rowid=?')
                .run(id, function (err) {
                if (err)
                    reject({ error: err.message });
                else
                    resolve(stmt);
            });
        });
    };
    return EscritorioService;
}());
exports.EscritorioService = EscritorioService;
