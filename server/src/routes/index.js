import express from "express";
import videogameRouter from "./videogamesRoutes.js";
import genreRouter from "./genresRoutes.js";

const router = express.Router();

router.use("/videogames", videogameRouter);
// router.use("/platforms", platformRouter);
router.use("/genres", genreRouter);

export default router;
