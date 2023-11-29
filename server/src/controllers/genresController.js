// // controllers/genreController.js
// import axios from "axios";
// import { Genre } from "../models/index.js";
// import "dotenv/config";

// const getGenres = async (req, res) => {
//     try {
//         // Intenta obtener los géneros de la base de datos
//         let genres = await Genre.findAll();

//         // Si no hay géneros en la base de datos, obtén y guarda los géneros desde la API
//         if (genres.length === 0) {
//             const { API_KEY } = process.env;
//             const apiGenresResponse = await axios.get(
//                 `https://api.rawg.io/api/genres?key=${API_KEY}`
//             );
//         // Extrae la lista de géneros desde la respuesta de la API
//         const apiGenres = apiGenresResponse.data.results.map((genre) => {
//             return {
//             name: genre.name,
//             apiId: genre.id, // Añadimos el ID de la API para referencia
//             };
//         });

//         // Crea los géneros en la base de datos
//         genres = await Genre.bulkCreate(apiGenres);
//         }

//         // Envía la lista de géneros como respuesta
//         res.json(genres);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al obtener los géneros." });
//     }
// };

// export { getGenres };
