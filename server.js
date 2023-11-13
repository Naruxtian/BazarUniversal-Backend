"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Index_1 = __importDefault(require("./src/Index"));
const error_1 = __importDefault(require("./src/middleware/error"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    routes() {
        this.app.use("*/api/", Index_1.default);
        this.app.use(error_1.default);
    }
    run() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor corriendo en el puerto: ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.run();
