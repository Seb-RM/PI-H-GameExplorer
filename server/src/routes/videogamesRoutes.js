import express from "express";
import { getVideogames, getVideogameById, getVideogamesByName } from "../controllers/videogamesController.js";
import "dotenv/config";

const router = express.Router();

// GET | /videogames
router.get("/", getVideogames);

/// GET | /videogames/:idVideogame
router.get("/:idVideogame", getVideogameById);

// GET | /videogames/name?="..."
router.get("/name/search", getVideogamesByName);
// // POST | /videogames
// router.post("/videogames", async (req, res, next) => {
//     const { name, description, image, releaseDate, rating, genres, platforms } =
//         req.body;

//     try {
//         // Crear el videojuego en la base de datos
//         const newVideoGame = await VideoGame.create({
//         name,
//         description,
//         image,
//         releaseDate,
//         rating,
//         });

//         // Asociar géneros y plataformas al videojuego
//         if (genres && genres.length > 0) {
//         const genreInstances = await Genre.findAll({ where: { name: genres } });
//         await newVideoGame.addGenres(genreInstances);
//         }

//         if (platforms && platforms.length > 0) {
//         const platformInstances = await Platform.findAll({
//             where: { name: platforms },
//         });
//         await newVideoGame.addPlatforms(platformInstances);
//         }

//         res.json(newVideoGame);
//     } catch (error) {
//         next(error);
//     }
// });

export default router;
