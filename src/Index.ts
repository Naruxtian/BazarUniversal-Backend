import { Router } from "express";
import itemsRoute from "./controllers/route";

const router = Router();

router.use("/items", itemsRoute);

export default router;