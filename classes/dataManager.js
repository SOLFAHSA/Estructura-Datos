"use strict";
exports.__esModule = true;
exports.DataManager = void 0;
var sqlite3_1 = require("sqlite3");
var enviroment_1 = require("../global/enviroment");
var DataManager = /** @class */ (function () {
    function DataManager() {
        this.db = new sqlite3_1["default"].Database(enviroment_1.FILE_PATH_DB, function (error) {
            if (error)
                console.log('Error no se cargo el archivo de la base de datos: ', error);
        });
    }
    Object.defineProperty(DataManager, "instance", {
        get: function () {
            return this.dtm || (this.dtm = new DataManager());
        },
        enumerable: false,
        configurable: true
    });
    return DataManager;
}());
exports.DataManager = DataManager;
