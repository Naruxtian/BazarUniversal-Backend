"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHttp {
    constructor(response) {
        this.response = response;
    }
    send(message, data, success, code, cookie) {
        if (cookie === null || cookie === void 0 ? void 0 : cookie.key) {
            this.response
                .status(code)
                .cookie(cookie.key, cookie.value)
                .json({
                message,
                code: code || 500,
                success,
                data: Object.assign({}, data)
            });
        }
        else {
            this.response
                .status(code || 500)
                .json({
                message,
                code: code || 500,
                success,
                data: Object.assign({}, data)
            });
        }
    }
}
exports.default = ResponseHttp;
