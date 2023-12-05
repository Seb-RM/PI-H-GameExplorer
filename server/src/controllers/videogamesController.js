import axios from "axios";
import { Genre, VideoGame } from "../models/index.js";
import { Op } from "sequelize";
import "dotenv/config";

const getVideogames = async (req, res, next) => {
    try {
      // Obtener videojuegos de la base de datos
      const existingVideogames = await VideoGame.findAll({
        include: [
          {
            model: Genre,
            through: {
              attributes: [], 
            },
          },
        ],
      });

      const filteredVideogames = existingVideogames.map((videoGame) => {
        return {
          id: videoGame.id,
          name: videoGame.name,
          rating: videoGame.rating,
          image: videoGame.image, 
          genres: videoGame.Genres.map((genre) => genre.name),
        };
      });

      // Obtener videojuegos de la API
      const { API_KEY } = process.env;
      const apiResponse = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
      );
      const videogamesFromAPI = apiResponse.data.results.map(
        (videogameFromAPI) => ({
          id: videogameFromAPI.id,
          name: videogameFromAPI.name,
          rating: videogameFromAPI.rating,
          image: videogameFromAPI.background_image,
          // releaseDate: videogameFromAPI.released,
          // rating: videogameFromAPI.rating,
          // description: videogameFromAPI.description_raw,
          // platforms: videogameFromAPI.platforms.map((platform) => platform.platform.name),
          genres: videogameFromAPI.genres.map((genre) => genre.name),
        })
      );

      const allVideogames = [...filteredVideogames, ...videogamesFromAPI];

      if (allVideogames.length === 0) {
        
        return res.json([]);
      }

      res.json(allVideogames);
    } catch (error) {
        next(error);
    }
};

const getVideogameById = async (req, res, next) => {

    try {
        const { idVideogame } = req.params;

        const isUUID = idVideogame.match(
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        );

        if (isUUID) {
        // Buscar en la base de datos
        const existingVideogame = await VideoGame.findByPk(idVideogame, {
            include: [
                {
                model: Genre,
                through: {
                    attributes: [],
                },
                },
            ],
        });

        if (existingVideogame) {
            const filteredVideogame = {
                id: existingVideogame.id,
                name: existingVideogame.name,
                image: existingVideogame.image,
                releaseDate:existingVideogame.releaseDate,
                rating:existingVideogame.rating,
                description:existingVideogame.description,
                platforms:[existingVideogame.platforms],
                genres: existingVideogame.Genres.map((genre) => genre.name),
            };
            res.json(filteredVideogame);
            
        } else {
            res
            .status(404)
            .json({ message: "Video juego no encontrado en la base de datos." });
        }
        } else {
        // Si no se encuentra en la base de datos, buscar en la API
            const { API_KEY } = process.env;
            const apiResponse = await axios.get(
                `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
            );

            const videogameFromAPI = apiResponse.data;

            const processedVideogame = {
                id: videogameFromAPI.id,
                name: videogameFromAPI.name,
                image: videogameFromAPI.background_image,
                releaseDate: videogameFromAPI.released,
                rating: videogameFromAPI.rating,
                description: videogameFromAPI.description_raw,
                platforms: videogameFromAPI.platforms.map(
                    (platform) => platform.platform.name
                ),
                genres: videogameFromAPI.genres.map((genre) => genre.name),
            };

            res.json(processedVideogame);
        };
    } catch (error) {
            console.error("Error en getVideogameById:", error);
            res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getVideogamesByName = async (req, res, next) => {
    
    try {
        const { name } = req.query; 
        // Buscar videojuegos por nombre en la base de datos
        const existingVideogames = await VideoGame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`, // Búsqueda sin importar mayúsculas o minúsculas
                },
            },
            include: [Genre, Platform], // Incluir información de géneros y plataformas asociadas
            limit: 15, // Limitar a 15 resultados
        });

        const { API_KEY } = process.env;
        const apiResponse = await axios.get(
            `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );
        const videogamesFromAPI = apiResponse.data.results.map(
            (videogameFromAPI) => ({
                apiId: videogameFromAPI.id,
                name: videogameFromAPI.name,
                image: videogameFromAPI.background_image,
                releaseDate: videogameFromAPI.released,
                rating: videogameFromAPI.rating,
                description: videogameFromAPI.description_raw,
                platforms: videogameFromAPI.platforms.map((platform) => platform.platform.name),
                genres: videogameFromAPI.genres.map((genre) => genre.name),
            })
        );
        
        const combinedResults = [...existingVideogames, ...videogamesFromAPI].slice(0, 15);

        if (combinedResults.length === 0) {
            res.json({ message: "No se encontraron juegos con ese nombre." });
        } else {
            res.json(combinedResults);
        }

    } catch (error) {
        next(error);
    }
};

const createVideogame = async (req, res, next) => {

    try {
        const {
            name,
            description,
            image,
            releaseDate,
            rating,
            genres, // Lista de IDs de géneros asociados
            platforms, // Lista de IDs de plataformas asociadas
        } = req.body;

        // Validar que los datos necesarios estén presentes
        if (
            !name ||
            !description ||
            !image ||
            !releaseDate ||
            !rating ||
            !genres ||
            !platforms
        ) {
            return res
            .status(400)
            .json({ message: "Todos los campos son obligatorios." });
        }

        // Validar que genres y platforms sean arreglos con al menos un elemento
        if (
            !Array.isArray(genres) ||
            genres.length === 0
            // !Array.isArray(platforms) ||
            // platforms.length === 0
        ) {
            return res.status(400).json({
            message: "Se debe proporcionar al menos un género y una plataforma.",
            });
        }

        // Verificar si los géneros y plataformas proporcionados existen en la base de datos
        const existingGenres = await Genre.findAll({ where: { name: genres } });
        // const existingPlatforms = await Platform.findAll({
        //     where: { name: platforms },
        // });

        // Validar que todos los géneros y plataformas proporcionados existan
        if (
            existingGenres.length !== genres.length 
            // || existingPlatforms.length !== platforms.length
        ) {
            return res.status(400).json({
            message:
                "Alguno de los géneros o plataformas proporcionados no existe.",
            });
        }

        // Crear el videojuego en la base de datos
        const newVideogame = await VideoGame.create({
            name,
            description,
            image,
            releaseDate,
            rating,
            platforms
        });

        // Relacionar el videojuego con sus géneros y plataformas
        await newVideogame.addGenres(existingGenres);
        // await newVideogame.addPlatforms(existingPlatforms);
        
        res.status(201).json(newVideogame);
    } catch (error) {
            next(error);
    }
};

export {
    getVideogames,
    getVideogameById,
    getVideogamesByName,
    createVideogame,
};