"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const express_validator_1 = require("express-validator");
const errorResponse_1 = __importDefault(require("../util/errorResponse"));
const validation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new errorResponse_1.default("Revise su peticion, datos incompatibles", 400));
    }
    return next();
};
exports.validation = validation;
