"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../util/errorResponse"));
exports.auth = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    if (!authHeader)
        throw new errorResponse_1.default("No token found", 401);
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD);
    }
    catch (err) {
        throw new errorResponse_1.default("Invalid token", 401);
    }
    if (!decodedToken)
        throw new errorResponse_1.default("Invalid token", 401);
    const { id, accesos } = decodedToken;
    req.user = { id, accesos };
    next();
}));
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user)
            throw new errorResponse_1.default("No user found", 401);
        if (!req.user.accesos)
            throw new errorResponse_1.default("No access found", 401);
        for (const role of roles) {
            if (req.user.accesos.includes(role)) {
                return next();
            }
        }
        throw new errorResponse_1.default("User not authorized", 401);
    };
};
exports.authorize = authorize;
