//controllers/platformController.js
import axios from "axios";
import { Platform } from "../models/index.js";
import "dotenv/config";

const getPlatforms = async (req, res, next) => {
    try {
        // Verificar si ya hay plataformas en la base de datos
        const existingPlatforms = await Platform.findAll();

        if (existingPlatforms.length === 0) {
            // Si no hay plataformas, obtenerlas de la API y guardarlas en la base de datos
            const { API_KEY } = process.env;

            const apiResponse = await axios.get(
                `https://api.rawg.io/api/platforms?key=${API_KEY}`
            );
            
            const platformsFromApi = apiResponse.data.results.map(({ id, name }) => ({
                apiId: id, 
                name: name,
            }));
            // Guardar las plataformas en la base de datos
            await Platform.bulkCreate(platformsFromApi);

            res.json(platformsFromApi);

        } else {
        // Si ya hay plataformas en la base de datos, devolverlas
        res.json(existingPlatforms);
        }
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener las plataformas." });
    }
};

export  default getPlatforms ;
