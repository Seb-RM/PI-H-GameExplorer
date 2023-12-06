// controllers/genreController.js
import axios from "axios";
import { Genre } from "../models/index.js";
import "dotenv/config";

const getGenres = async (req, res) => {
    try {

        const existingGenres = await Genre.findAll();
        
        if (existingGenres.length === 0) {
            const { API_KEY } = process.env;
            const apiResponse = await axios.get(
                `https://api.rawg.io/api/genres?key=${API_KEY}`
            );
            
            const genresFromApi = apiResponse.data.results.map(
                ({ id, name }) => ({
                apiId: id,
                name: name,
                })
            );
            
            await Genre.bulkCreate(genresFromApi);
            
            res.json(genresFromApi);
        } else {
        
        res.json(existingGenres);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los géneros." });
    }
};

export default getGenres ;
