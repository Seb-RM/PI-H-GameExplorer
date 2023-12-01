import express from "express";
import { getVideogames, getVideogameById, getVideogamesByName, createVideogame } from "../controllers/videogamesController.js";
import "dotenv/config";

const router = express.Router();

// GET | /videogames
router.get("/", getVideogames);

/// GET | /videogames/:idVideogame
router.get("/:idVideogame", getVideogameById);

// GET | /videogames/name?="..."
router.get("/search/name", getVideogamesByName);

// POST | /videogames
router.post("/", createVideogame);

export default router;
