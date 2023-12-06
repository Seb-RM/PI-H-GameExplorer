import express from "express";
import getGenres  from "../controllers/genresController.js";

const router = express.Router();

router.get("/", getGenres);

export default router;
