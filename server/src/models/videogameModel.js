import { DataTypes } from "sequelize";
import sequelize from "../DB_connection.js";

const VideoGame = sequelize.define(
    "VideoGame",
    {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30], 
        },
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500], 
        },
        },
        image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true, 
        },
        },
        releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true, 
            max: 5.0, 
        },
        },
        platforms: {
        type: DataTypes.STRING,
        },
    },
    {
        hooks: {
        beforeValidate: (videoGame, options) => {
            if (videoGame.name) {
            videoGame.name = formatearName(videoGame.name);
            }
        },
        },
    }
);

const formatearName = (name) => {
    return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export default VideoGame;
