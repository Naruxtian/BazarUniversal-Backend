"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../util/response"));
const errorHandler = (err, req, res, next) => {
    const response = new response_1.default(res);
    response.send(err.message || "Bad Request", {}, false, err.code || 500);
};
exports.default = errorHandler;
