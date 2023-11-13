"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = ErrorResponse;
