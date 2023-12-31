import Genre from "./genreModel.js";
// import Platform from "./platformModel.js";
import VideoGame from "./videogameModel.js";

VideoGame.belongsToMany(Genre, { 
    through: "VideoGameGenres", 
    timestamps: false 
});
Genre.belongsToMany(VideoGame, {
    through: "VideoGameGenres",
    timestamps: false,
});

// VideoGame.belongsToMany(Platform, {
//     through: "VideoGamePlatforms",
//     timestamps: false,
// });
// Platform.belongsToMany(VideoGame, {
//     through: "VideoGamePlatforms",
//     timestamps: false,
// });

export {  Genre, VideoGame };
