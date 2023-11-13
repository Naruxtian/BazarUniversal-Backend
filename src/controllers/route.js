"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsController_1 = require("../controllers/itemsController");
const router = (0, express_1.Router)();
router
    .get("/", itemsController_1.searchItems)
    .get("/:id", itemsController_1.getItem)
    .post("/uploadData", itemsController_1.uploadItems);
exports.default = router;
