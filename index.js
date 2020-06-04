"use strict";
exports.__esModule = true;
var server_1 = require("./classes/server");
var router_1 = require("./routes/router");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var escritorioService_1 = require("./services/escritorioService");
var SERVER = server_1["default"].instance;
var ES = escritorioService_1.EscritorioService.instance;
// MIDDLEWARES 
SERVER.app.use(body_parser_1["default"].urlencoded({ extended: true }));
SERVER.app.use(body_parser_1["default"].json());
SERVER.app.use(cors_1["default"]({ origin: true, credentials: false }));
SERVER.app.use('/', router_1["default"]);
SERVER.start(function () {
    console.log("Servidor corriendo en el puerto: " + SERVER.port);
});
