// controllers/platformController.js
import axios from "axios";
import { Platform } from "../models/index.js";
import "dotenv/config";

const getPlatforms = async (req, res, next) => {
    try {
        // Verificar si ya hay plataformas en la base de datos
        const existingPlatforms = await Platform.findAll();

        if (existingPlatforms.length === 0) {
        // Si no hay plataformas, obtenerlas de la API y guardarlas en la base de datos
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://api.rawg.io/api/platforms?key=${apiKey}`;
        const response = await axios.get(apiUrl);

        const platformsFromApi = response.data.results;

        // Guardar las plataformas en la base de datos
        await Platform.bulkCreate(platformsFromApi);

        res.json(platformsFromApi);
        } else {
        // Si ya hay plataformas en la base de datos, devolverlas
        res.json(existingPlatforms);
        }
    } catch (error) {
        next(error);
    }
};

export { getPlatforms };
