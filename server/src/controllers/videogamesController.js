
import { VideoGame } from "../models/videogamesModel.js";

// Obtener todos los videojuegos
export const getVideoGames = async (req, res) => {
    try {
        const videoGames = await VideoGame.findAll();
        res.json(videoGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los videojuegos." });
    }
};

// Obtener un videojuego por ID
export const getVideoGameById = async (req, res) => {
    const { id } = req.params;

    try {
        const videoGame = await VideoGame.findByPk(id);

        if (!videoGame) {
        return res.status(404).json({ error: "Videojuego no encontrado." });
        }

        res.json(videoGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el videojuego." });
    }
};

// Crear un nuevo videojuego
    export const createVideoGame = async (req, res) => {
    const { title, genre, platform, releaseDate } = req.body;

    try {
        const newVideoGame = await VideoGame.create({
        title,
        genre,
        platform,
        releaseDate,
        });

        res.status(201).json(newVideoGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el videojuego." });
    }
};
