import { Router } from "express";
import { testInput } from "../controllers/dbTestController.js";

const router = Router();

router.get("/test-input", testInput);

export default router;
