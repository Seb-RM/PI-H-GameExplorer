// controllers/genreController.js
import axios from "axios";
import { Genre } from "../models/index.js";
import "dotenv/config";

const getGenres = async (req, res) => {
    try {

        const existingGenres = await Genre.findAll();
        // Si no hay géneros en la base de datos, obtén y guarda los géneros desde la API
        if (existingGenres.length === 0) {
            const { API_KEY } = process.env;
            const apiResponse = await axios.get(
                `https://api.rawg.io/api/genres?key=${API_KEY}`
            );
            // Extrae la lista de géneros desde la respuesta de la API
            const genresFromApi = apiResponse.data.results.map(
                ({ id, name }) => ({
                apiId: id,
                name: name,
                })
            );
            // Crea los géneros en la base de datos
            await Genre.bulkCreate(genresFromApi);
            // Envía la lista de géneros como respuesta
            res.json(genresFromApi);
        } else {
        // Si ya hay plataformas en la base de datos, devolverlas
        res.json(existingGenres);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los géneros." });
    }
};

export default getGenres ;
