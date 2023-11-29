// // controllers/videogameController.js
// import axios from "axios";
// import { Videogame, Genre, Platform } from "../models/index.js";
// import { Op } from "sequelize";
// import "dotenv/config";

// const getVideogames = async (req, res, next) => {
//     try {
//         // Obtener videojuegos de la base de datos
//         const videogamesFromDB = await Videogame.findAll({
//         include: [Genre, Platform], // Incluir información de géneros y plataformas asociadas
//         });

//         // Obtener videojuegos de la API
//         const { API_KEY } = process.env;
//         const response = await axios.get(
//             `https://api.rawg.io/api/games?api_key=${API_KEY}`
//         );
//         const videogamesFromAPI = response.data.results;

//         // Combinar videojuegos de la base de datos y la API
//         const allVideogames = [...videogamesFromDB, ...videogamesFromAPI];

//         res.json(allVideogames);
//     } catch (error) {
//         next(error);
//     }
// };

// const getVideogameById = async (req, res, next) => {
//     const { idVideogame } = req.params;

//     try {
//         // Obtener detalle del videojuego de la base de datos
//         const videogameFromDB = await Videogame.findByPk(idVideogame, {
//         include: [Genre, Platform], // Incluir información de géneros y plataformas asociadas
//         });

//         if (videogameFromDB) {
//         res.json(videogameFromDB);
//         } else {
//         // Si no se encuentra en la base de datos, buscar en la API
//         const { API_KEY } = process.env;
//         const response = await axios.get(
//             `https://api.rawg.io/api/games/${idVideogame}?api_key=${API_KEY}`
//         );
//         const videogameFromAPI = response.data;

//         res.json(videogameFromAPI);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// const getVideogamesByName = async (req, res, next) => {
//     const { name } = req.query;

//     try {
//         // Buscar videojuegos por nombre en la base de datos
//         const videogamesFromDB = await Videogame.findAll({
//         where: {
//             name: {
//             [Op.iLike]: `%${name}%`, // Búsqueda sin importar mayúsculas o minúsculas
//             },
//         },
//         include: [Genre, Platform], // Incluir información de géneros y plataformas asociadas
//         });

//         if (videogamesFromDB.length > 0) {
//         res.json(videogamesFromDB);
//         } else {
//         // Si no se encuentra en la base de datos, buscar en la API
//         const { API_KEY } = process.env;
//         const response = await axios.get(
//             `https://api.rawg.io/api/games?search=${name}&api_key=${API_KEY}`
//         );
//         const videogamesFromAPI = response.data.results;

//         res.json(videogamesFromAPI.slice(0, 15));
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// const createVideogame = async (req, res, next) => {
//     const {
//         name,
//         description,
//         image,
//         releaseDate,
//         rating,
//         genres, // Lista de IDs de géneros asociados
//         platforms, // Lista de IDs de plataformas asociadas
//     } = req.body;

//     try {
//         // Crear el videojuego en la base de datos
//         const newVideogame = await Videogame.create({
//         name,
//         description,
//         image,
//         releaseDate,
//         rating,
//         });

//         // Asociar géneros al videojuego
//         if (genres && genres.length > 0) {
//         const genresToAdd = await Genre.findAll({
//             where: {
//             id: {
//                 [Op.in]: genres,
//             },
//             },
//         });

//         await newVideogame.addGenres(genresToAdd);
//         }

//         // Asociar plataformas al videojuego
//         if (platforms && platforms.length > 0) {
//         const platformsToAdd = await Platform.findAll({
//             where: {
//             id: {
//                 [Op.in]: platforms,
//             },
//             },
//         });

//         await newVideogame.addPlatforms(platformsToAdd);
//         }

//         res.status(201).json(newVideogame);
//     } catch (error) {
//         next(error);
//     }
// };

// export {
//     getVideogames,
//     getVideogameById,
//     getVideogamesByName,
//     createVideogame,
// };