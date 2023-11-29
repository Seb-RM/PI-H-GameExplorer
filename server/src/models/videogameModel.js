// import { DataTypes } from "sequelize";
// import sequelize from "../DB_connection.js";

// const VideoGame = (sequelize)=>{sequelize.define("VideoGame", {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//         len: [1, 30], // Longitud entre 1 y 30 caracteres
//         },
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//         len: [1, 500], // Longitud entre 1 y 500 caracteres
//         },
//     },
//     image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//         isUrl: true, // Debe ser una URL
//         },
//     },
//     releaseDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     rating: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         validate: {
//         isFloat: true, // Debe ser un número decimal
//         max: 5.0, // No puede ser mayor a 5.0
//         },
//     }
//     },{
//     hooks: {
//         beforeValidate: (videoGame, options) => {
//         // Función para formatear el nombre
//         if (videoGame.name) {
//             videoGame.name = formatearName(videoGame.name);
//             }
//             },
//         },
// })};
// // Función para formatear el nombre
// const formatearName = (name) => {
//   // Convierte la primera letra a mayúscula y el resto a minúscula
//     return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
// };

// export default VideoGame;
