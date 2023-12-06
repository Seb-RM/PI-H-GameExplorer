import express from "express";
import getPlatforms from "../controllers/platformsController.js";

const router = express.Router();

router.get("/", getPlatforms);

export default router;
