"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getItem = exports.searchItems = exports.uploadItems = void 0;
const firestore_1 = require("firebase/firestore");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const async_1 = __importDefault(require("../middleware/async"));
const response_1 = __importDefault(require("../util/response"));
const errorResponse_1 = __importDefault(require("../util/errorResponse"));
const firebaseConfig_1 = require("../config/firebaseConfig");
exports.uploadItems = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path.resolve("src/data", 'products.json');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const batch = [];
        jsonData.products.forEach((item) => {
            const docRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, "items"));
            batch.push((0, firestore_1.setDoc)(docRef, item));
        });
        yield Promise.all(batch);
        new response_1.default(res).send("Data uploaded", jsonData, true, 200);
    }
    catch (error) {
        console.error(error);
        const errorCode = error.code || 500;
        const errorMessage = error.message;
        next(new errorResponse_1.default(errorMessage, errorCode));
    }
}));
exports.searchItems = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const queri = (0, firestore_1.query)((0, firestore_1.collection)(firebaseConfig_1.db, "items"));
        const querySnapshot = yield (0, firestore_1.getDocs)(queri);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(Object.assign({}, doc.data()));
        });
        if (q == undefined) {
            new response_1.default(res).send("Es necesario ingresar un parametro de busqueda", null, false, 400);
        }
        const data = items.filter((item) => item.title.toLowerCase().includes(q.toString().toLowerCase()) ||
            item.description.toLowerCase().includes(q.toString().toLowerCase()) ||
            item.brand.toLowerCase().includes(q.toString().toLowerCase()) ||
            item.category.toLowerCase().includes(q.toString().toLowerCase()));
        new response_1.default(res).send("Search result", data, true, 200);
    }
    catch (error) {
        console.error(error);
        const errorCode = error.code || 500;
        const errorMessage = error.message;
        next(new errorResponse_1.default(errorMessage, errorCode));
    }
}));
exports.getItem = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebaseConfig_1.db, "items"), (0, firestore_1.where)("id", "==", parseInt(id)));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(Object.assign({}, doc.data()));
        });
        new response_1.default(res).send("Item detail", items[0], true, 200);
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        next(new errorResponse_1.default(errorMessage, errorCode));
    }
}));
