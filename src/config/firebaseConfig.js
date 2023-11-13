"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyD4KsYOJ_--X08O3RvyraKzVOZW-qVuZBs",
    authDomain: "bazaruniversal-d5502.firebaseapp.com",
    projectId: "bazaruniversal-d5502",
    storageBucket: "bazaruniversal-d5502.appspot.com",
    messagingSenderId: "681583002025",
    appId: "1:681583002025:web:2a7cfe8a0cb1d4b38c84b8"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
