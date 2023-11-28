// routes/platformRoutes.js
import express from "express";
import { getPlatforms } from "../controllers/platformController.js";

const router = express.Router();

router.get("/platforms", getPlatforms);

export default router;
