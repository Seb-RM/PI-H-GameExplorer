import {Router} from "express";
import {
    getVideoGames,
    getVideoGameById,
    createVideoGame,
} from "../controllers/videogamesController.js";

const router = Router();

router.get("/videogames", getVideoGames);
router.get("/videogames/:id", getVideoGameById);
router.post("/videogames/create", createVideoGame);

export default router;
