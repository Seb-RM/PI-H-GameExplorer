import axios from "axios";
import { Platform } from "../models/index.js";
import "dotenv/config";

const getPlatforms = async (req, res, next) => {
    try {
        
        const existingPlatforms = await Platform.findAll();

        if (existingPlatforms.length === 0) {
            const { API_KEY } = process.env;
            const apiResponse = await axios.get(
                `https://api.rawg.io/api/platforms?key=${API_KEY}`
            );
            
            const platformsFromApi = apiResponse.data.results.map(({ id, name }) => ({
                apiId: id, 
                name: name,
            }));
            
            await Platform.bulkCreate(platformsFromApi);

            res.json(platformsFromApi);

        } else {
        
        res.json(existingPlatforms);
        }
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener las plataformas." });
    }
};

export  default getPlatforms ;
