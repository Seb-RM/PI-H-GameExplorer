// models/index.js
import VideoGame from "./videogameModel.js";
import Genre from "./genreModel.js";
import Platform from "./platformModel.js";

// Relación muchos a muchos entre VideoGame y Genre
VideoGame.belongsToMany(Genre, { through: "VideoGameGenres" });
Genre.belongsToMany(VideoGame, { through: "VideoGameGenres" });

// Relación muchos a muchos entre VideoGame y Platform
VideoGame.belongsToMany(Platform, { through: "VideoGamePlatforms" });
Platform.belongsToMany(VideoGame, { through: "VideoGamePlatforms" });

export { VideoGame, Genre, Platform };
