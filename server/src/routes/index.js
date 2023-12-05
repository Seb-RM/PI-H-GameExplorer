import express from "express";
import videogameRouter from "./videogamesRoutes.js";
// import platformRouter from "./platformsRoutes.js";
import genreRouter from "./genresRoutes.js";

const router = express.Router();

// Combina las rutas de videogames, platforms y genres
router.use("/videogames", videogameRouter);
// router.use("/platforms", platformRouter);
router.use("/genres", genreRouter);

export default router;
