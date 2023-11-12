import { Router } from "express";
import { uploadItems, searchItems, getItem } from "../controllers/itemsController";

const router = Router();

router
    .get("/", searchItems
    )
    .get("/:id", getItem
    )
    .post("/uploadData", uploadItems
    );

export default router;