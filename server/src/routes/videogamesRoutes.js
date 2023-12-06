import express from "express";
import { getVideogames, getVideogameById, getVideogamesByName, createVideogame } from "../controllers/videogamesController.js";
import "dotenv/config";

const router = express.Router();

router.get("/", getVideogames);

router.get("/:idVideogame", getVideogameById);

router.get("/search/name", getVideogamesByName);

router.post("/", createVideogame);

export default router;
