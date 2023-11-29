// import express from "express";
// import { Op } from "sequelize";
// import { VideoGame, Genre, Platform } from "../models/index.js";
// import axios from "axios";
// import "dotenv/config";

// const router = express.Router();

// // GET | /videogames
// router.get("/videogames", async (req, res, next) => {
//     try {
//         // Obtener todos los videojuegos
//         const videoGames = await VideoGame.findAll({
//         include: [
//             {
//             model: Genre,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//             {
//             model: Platform,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//         ],
//         });

//         res.json(videoGames);
//     } catch (error) {
//         next(error);
//     }
// });

// // GET | /videogames/:idVideogame
// router.get("/videogames/:idVideogame", async (req, res, next) => {
//     const { idVideogame } = req.params;

//     try {
//         // Obtener el detalle de un videojuego específico por ID
//         const videoGame = await VideoGame.findByPk(idVideogame, {
//         include: [
//             {
//             model: Genre,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//             {
//             model: Platform,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//         ],
//     });

//     if (!videoGame) {
//         return res.status(404).json({ error: "Videojuego no encontrado." });
//         }

//         res.json(videoGame);
//     } catch (error) {
//         next(error);
//     }
// });

// // GET | /videogames/name?="..."
// router.get("/videogames/name", async (req, res, next) => {
//     const { query } = req.query;

//     try {
//         // Buscar videojuegos por nombre (case-insensitive)
//         const videoGames = await VideoGame.findAll({
//         where: {
//             name: {
//             [Op.iLike]: `%${query}%`,
//             },
//         },
//         include: [
//             {
//             model: Genre,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//             {
//             model: Platform,
//             attributes: ["id", "name"],
//             through: { attributes: [] },
//             },
//         ],
//         limit: 15,
//         });

//         if (videoGames.length === 0) {
//         return res.status(404).json({ error: "No se encontraron videojuegos que coincidan." });
//     }

//     res.json(videoGames);
//     } catch (error) {
//         next(error);
//     }
// });

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

// export default router;
